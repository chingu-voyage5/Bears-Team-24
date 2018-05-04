const { Topic } = require('../../models/topic');

async function getTopics(req, res) {
  const topics = await Topic.find().sort('order');
  res.json(topics);
}

module.exports = getTopics;
