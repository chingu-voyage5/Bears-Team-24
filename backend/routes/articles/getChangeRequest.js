const Request = require('../../models/request');

const getChangeRequest = async (req, res) => {
  const article = req.params.article_id || req.query.article_id;
  console.log('@getChangeRequest article id:', article);
  const requests = await Request.find({
    article,
    status: 'pending',
  })
    .populate({
      path: 'article',
      populate: { path: 'topic sub_topic', select: 'name' },
    })
    .populate('requester');
  res.json(requests);
};

module.exports = getChangeRequest;
