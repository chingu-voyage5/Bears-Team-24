/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const Article = require('../../models/article');
const Request = require('../../models/request');
const History = require('../../models/history');

const upsert = async (req, res) => {
  let article;
  let sizePre = 0;
  if (req.body._id) {
    // Having problems resetting edit_lock for non member role, so only
    // set it for members
    const update = {};
    if (req.user.role === 'member') {
      update.edit_lock = true;
    }
    article = await Article.findByIdAndUpdate(req.body._id, update)
      .populate('creator')
      .populate('topic')
      .populate('sub_topic');
    sizePre = article.content.length;
    if (article.edit_lock) {
      return res.json({
        success: false,
        error: 'Article being edited, save failed',
      });
    }
  } else {
    article = new Article();
    article.creator = req.user._id;
  }
  if (req.user.role === 'member') {
    const request = new Request({
      requester: req.user._id,
      article: article._id,
      status: 'pending',
      topic: req.body.topic,
      sub_topic: req.body.sub_topic,
      title: req.body.title,
      order: req.body.order,
      content: req.body.content,
    });
    try {
      await request.save();
      return res.json({
        success: false,
        error: 'Your request has been registered',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('member article request failed:', e);
      return res.json({ success: false, error: e.messageText });
    }
  }
  try {
    article.topic = req.body.topic;
    article.sub_topic = req.body.sub_topic;
    article.title = req.body.title;
    article.order = req.body.order;
    article.content = req.body.content;
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
