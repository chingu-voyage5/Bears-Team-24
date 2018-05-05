const { Topic } = require('../../models/topic');
const History = require('../../models/history');

const createTopic = async (req, res) => {
  const topic = new Topic({
    name: req.body.name,
    order: req.body.order,
  });
  try {
    await topic.save();
    const history = new History({
      contributor: req.user._id,
      topic: topic._id,
      sizePre: 0,
      sizePost: topic.name.length,
    });
    await history.save();
    res.json({ success: true, _id: topic._id });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Create topic failed:', e);
    res.json({ success: false });
  }
};

module.exports = createTopic;
