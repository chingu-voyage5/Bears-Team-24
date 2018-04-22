const { SubTopic } = require('../../models/topic');
const History = require('../../models/history');

/* eslint-disable camelcase */

const upsertSubTopics = async (req, res) => {
  const promises = [];
  req.body.forEach(sub => {
    const p = new Promise(async resolve => {
      let sub_topic;
      let sizePre = 0;
      if (sub._id) {
        sub_topic = await SubTopic.findById(sub._id);
        sizePre = sub_topic.name.length;
      } else {
        sub_topic = new SubTopic();
      }
      sub_topic.name = sub.name;
      sub_topic.order = sub.order;
      // FIXME: this won't work if we have a new topic/sub-topic
      sub_topic.parent = sub.parent;
      try {
        await sub_topic.save();
        const history = new History({
          contributor: req.user._id,
          sub_topic: sub_topic._id,
          sizePre,
          sizePost: sub_topic.name.length,
        });
        await history.save();
        resolve({ success: true, _id: sub_topic._id });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('upsert subtopic failed:', e);
        resolve({ success: false, _id: sub_topic._id });
      }
    });
    promises.push(p);
  });
  Promise.all(promises).then(results => {
    res.json(results);
  });
};

/* eslint-enable camelcase */

module.exports = upsertSubTopics;
