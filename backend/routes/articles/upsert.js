/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const Article = require('../../models/article');
const { Topic, SubTopic } = require('../../models/topic');

const upsert = async (req, res) => {
  let newArticle = false;
  let article;
  let topic;
  let sub_topic;
  if (req.body._id) {
    article = await Article.findById(req.body._id)
      .populate('creator')
      .populate('topic')
      .populate('sub_topic');
    topic = article.topic;
    sub_topic = article.sub_topic;
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
  await article.save();
  res.json({
    success: true,
    _id: article._id,
    topic_id: article.topic,
    sub_topic_id: article.sub_topic,
  });
};

module.exports = upsert;
