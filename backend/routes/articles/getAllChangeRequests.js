const Request = require('../../models/request');

const getAllChangeRequests = async (req, res) => {
  const requests = await Request.find({ status: 'pending' })
    .populate({
      path: 'article',
      populate: { path: 'topic sub_topic', select: 'name' },
    })
    .populate('requester');
  res.json(requests);
};

module.exports = getAllChangeRequests;
