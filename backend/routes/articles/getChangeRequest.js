/* eslint-disable camelcase */
const Request = require('../../models/request');
const { diffLines } = require('diff');

const getChangeRequest = async (req, res) => {
  const article_id = req.params.article_id || req.query.article_id;
  const requests = await Request.find({
    article: article_id,
    status: 'pending',
  })
    .populate({
      path: 'article',
      populate: { path: 'topic sub_topic', select: 'name' },
    })
    .populate('requester', 'username')
    .populate('topic', 'name')
    .populate('sub_topic', 'name');
  const { _id, article, title, topic, sub_topic, order, content } = requests[0];
  const diff = diffLines(article.content, content);
  const request = {
    _id,
    article: article._id,
    title,
    topic,
    sub_topic,
    order,
    diff,
  };
  res.json(request);
};

module.exports = getChangeRequest;
