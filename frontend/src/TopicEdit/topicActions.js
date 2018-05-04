import { saveTopics } from './api';

const saveTopicUpdates = topicList => {
  const topicUpdates = topicList.reduce((acc, topic) => {
    if (topic.isDirty) {
      const { isDirty, ...updateTopic } = topic;
      return acc.concat(updateTopic);
    }
    return acc;
  }, []);
  if (topicUpdates) {
    return saveTopics(topicUpdates).then(results =>
      results.reduce((acc, res) => {
        if (!res.success) {
          return false;
        }
        return acc;
      }, true)
    );
  }
  return Promise.resolve(false);
};

export default saveTopicUpdates;
