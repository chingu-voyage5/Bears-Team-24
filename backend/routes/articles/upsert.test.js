const { before } = require('mocha');
const { expect } = require('chai');

const upsert = require('./upsert');

const Article = require('../../models/article');
const { Topic, SubTopic } = require('../../models/topic');
const Request = require('../../models/request');
const History = require('../../models/history');
const User = require('../../models/user');

const testTopics = [{ name: 'Voyage', order: 1 }];
const testSubTopics = [{ name: 'About wiki', order: 1 }];

let topics;
let subTopics;

before(async () => {
  await Topic.remove();
  await SubTopic.remove();
  topics = testTopics.map(async topic => {
    const t = new Topic(topic);
    await t.save();
    return t;
  });
  subTopics = testSubTopics.map(async subTopic => {
    const t = new SubTopic(subTopic);
    await t.save();
    return t;
  });
});

describe('Article content moderation', () => {
  beforeEach(async () => {
    await Article.remove();
    await History.remove();
    await Request.remove();
    await User.remove();
  });

  it('should update an article for moderator role', async () => {
    const testArticle = new Article({
      title: 'About this wiki',
      order: 1,
      topic: topics[0]._id,
      sub_topic: subTopics[0]._id,
      content: 'test content',
      edit_lock: false,
    });
    await testArticle.save();
    const testUser = new User({
      username: 'nik',
      email: 'n@g.com',
      role: 'moderator',
    });
    await testUser.save();
    const req = {
      body: { ...testArticle.toObject(), content: 'updated content' },
      user: { ...testUser.toObject() },
    };
    const res = { json: response => response };
    const response = await upsert(req, res);

    expect(response.success).to.equal(true);
    const history = await History.find({});
    expect(history).to.have.lengthOf(1);
    const request = await Request.find({});
    expect(request).to.have.lengthOf(0);
    const articles = await Article.find({});
    expect(articles).to.have.lengthOf(1);
    const article = articles[0];
    expect(article.content).to.equal('updated content');
    expect(article.edit_lock).to.equal(false);
  });

  it('should create request for member role', async () => {
    const testArticle = new Article({
      title: 'About this wiki',
      order: 1,
      topic: topics[0]._id,
      sub_topic: subTopics[0]._id,
      content: 'test content',
      edit_lock: false,
    });
    await testArticle.save();
    const testUser = new User({
      username: 'nik',
      email: 'n@g.com',
      role: 'member',
    });
    await testUser.save();
    const req = {
      body: { ...testArticle.toObject(), content: 'updated content' },
      user: { ...testUser.toObject() },
    };
    const res = { json: response => response };
    const response = await upsert(req, res);

    expect(response.success).to.equal(false);
    expect(response.error).to.equal('Your request has been registered');
    const history = await History.find({});
    expect(history).to.have.lengthOf(0);
    const request = await Request.find({});
    expect(request).to.have.lengthOf(1);
    expect(request[0].content).to.equal('updated content');
    const articles = await Article.find({});
    expect(articles).to.have.lengthOf(1);
    const article = articles[0];
    expect(article.content).to.equal('test content');
    expect(article.edit_lock).to.equal(true);
  });

  it('should reject update when edit_lock is set', async () => {
    const testArticle = new Article({
      title: 'About this wiki',
      order: 1,
      topic: topics[0]._id,
      sub_topic: subTopics[0]._id,
      content: 'test content',
      edit_lock: true,
    });
    await testArticle.save();
    const testUser = new User({
      username: 'nik',
      email: 'n@g.com',
      role: 'admin',
    });
    await testUser.save();
    const req = {
      body: { ...testArticle.toObject(), content: 'updated content' },
      user: { ...testUser.toObject() },
    };
    const res = { json: response => response };
    const response = await upsert(req, res);

    expect(response.success).to.equal(false);
    expect(response.error).to.equal('Article being edited, save failed');
  });
});
