/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const Article = require('../../models/article');
const { Topic, SubTopic } = require('../../models/topic');
const History = require('../../models/history');

const upsert = async (req, res) => {
  let newArticle = false;
  let article;
  let topic;
  let sub_topic;
  let sizePre = 0;
  if (req.body._id) {
    article = await Article.findById(req.body._id)
      .populate('creator')
      .populate('topic')
      .populate('sub_topic');
    topic = article.topic;
    sub_topic = article.sub_topic;
    sizePre = article.content.length;
  } else {
    newArticle = true;
    article = new Article();
    topic = new Topic();
    sub_topic = new SubTopic();
    article.creator = req.user._id;
  }
  article.title = req.body.title;
  article.order = req.body.order;
  article.content = req.body.content;
  if (newArticle || article.topic.name !== req.body.topic.name) {
    topic._id = req.body.topic._id;
    topic.name = req.body.topic.name;
    topic.order = req.body.topic.order || 1;
    await topic.save();
  }
  if (newArticle || article.sub_topic.name !== req.body.sub_topic.name) {
    sub_topic._id = req.body.sub_topic._id;
    sub_topic.name = req.body.topic.name;
    sub_topic.order = req.body.sub_topic.order || 1;
    await sub_topic.save();
  }
  article.topic = topic._id;
  article.sub_topic = sub_topic._id;
  try {
    await article.save();
    const history = new History({
      contributor: req.user._id,
      article: article._id,
      sizePre,
      sizePost: article.content.length,
    });
    await history.save();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('article upsert failed:', e);
    return res.json({ success: false, error: e.messageText });
  }
  return res.json({
    success: true,
    _id: article._id,
    topic_id: article.topic,
    sub_topic_id: article.sub_topic,
  });
};

module.exports = upsert;
