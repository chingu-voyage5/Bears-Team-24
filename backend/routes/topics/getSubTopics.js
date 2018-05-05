const { SubTopic } = require('../../models/topic');

async function getSubTopics(req, res) {
  const subtopics = await SubTopic.find().sort('order');
  res.json(subtopics);
}

module.exports = getSubTopics;
