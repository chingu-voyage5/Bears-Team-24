/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const Article = require('../../models/article');
const History = require('../../models/history');

const upsert = async (req, res) => {
  let article;
  let sizePre = 0;
  if (req.body._id) {
    article = await Article.findById(req.body._id)
      .populate('creator')
      .populate('topic')
      .populate('sub_topic');
    sizePre = article.content.length;
  } else {
    article = new Article();
    article.creator = req.user._id;
  }
  article.topic = req.body.topic;
  article.sub_topic = req.body.sub_topic;
  article.title = req.body.title;
  article.order = req.body.order;
  article.content = req.body.content;
  // FIXME: articles can no longer change topic/sub-topic name (or order)
  // if (newArticle || article.topic.name !== req.body.topic.name) {
  //   topic._id = req.body.topic._id;
  //   topic.name = req.body.topic.name;
  //   topic.order = req.body.topic.order || 1;
  //   await topic.save();
  // }
  // if (newArticle || article.sub_topic.name !== req.body.sub_topic.name) {
  //   sub_topic._id = req.body.sub_topic._id;
  //   sub_topic.name = req.body.topic.name;
  //   sub_topic.order = req.body.sub_topic.order || 1;
  //   await sub_topic.save();
  // }
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
