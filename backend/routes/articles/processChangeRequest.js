/* eslint-disable camelcase */
const Article = require('../../models/article');
const History = require('../../models/history');
const Request = require('../../models/request');

const processChangeRequest = async (req, res) => {
  const { accept, request_id } = req.body;
  console.log('process change request accept, id', accept, request_id);
  const status = accept ? 'accepted' : 'rejected';
  const request = await Request.findByIdAndUpdate(request_id, {
    status,
  }).populate('article');
  if (accept) {
    const { article, title, topic, sub_topic, order, content } = request;
    const sizePre = article.content.length;
    article.title = title;
    article.topic = topic;
    article.sub_topic = sub_topic;
    article.order = order;
    article.content = content;
    article.edit_lock = false;
    try {
      await article.save();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('request article save failed:', e);
      return res.json({ success: false, error: e.messageText });
    }
    try {
      const history = new History({
        contributor: req.user._id,
        article: article._id,
        sizePre,
        sizePost: article.content.length,
      });
      await history.save();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('request article history failed:', e);
      return res.json({ success: false, error: e.messageText });
    }
  } else {
    try {
      console.log('process change request rejected clearing edit_lock article:', request.article._id);
      await Article.findByIdAndUpdate(request.article._id, {
        edit_lock: false,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('request article free lock failed:', e.messageText);
    }
  }
  return res.json({ success: true });
};

module.exports = processChangeRequest;
