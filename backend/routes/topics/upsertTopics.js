const { Topic } = require('../../models/topic');
const History = require('../../models/history');
const mongoose = require('mongoose');

const upsertTopics = async (req, res) => {
  const promises = [];
  req.body.forEach(async reqTopic => {
    const p = new Promise(async resolve => {
      let topic;
      let sizePre = 0;
      // FIXME: we create topics now so we'll always have valid topic._id
      // that's the plan anyway :rolling-eyes:
      if (mongoose.Types.ObjectId.isValid(reqTopic._id)) {
        topic = await Topic.findById(reqTopic._id);
        sizePre = topic.name.length;
      } else {
        topic = new Topic();
      }
      topic.name = reqTopic.name;
      topic.order = reqTopic.order;
      try {
        await topic.save();
        const history = new History({
          contributor: req.user._id,
          topic: topic._id,
          sizePre,
          sizePost: topic.name.length,
        });
        await history.save();
        resolve({ success: true, _id: topic._id });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('upsert topics failed:', e);
        resolve({ success: false, _id: topic._id });
      }
    });
    promises.push(p);
  });
  Promise.all(promises).then(results => {
    res.json(results);
  });
};

module.exports = upsertTopics;
