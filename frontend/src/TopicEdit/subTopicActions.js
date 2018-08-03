import { saveSubTopics } from './api';

const saveSubTopicUpdates = subTopicList => {
  const subUpdates = subTopicList.reduce((acc, sub) => {
    // if (sub.isDirty) {
    // eslint-disable-next-line
    if (true) {
      const { isDirty, ...updateSub } = sub;
      return acc.concat(updateSub);
    }
    return acc;
  }, []);
  if (subUpdates.length) {
    return saveSubTopics(subUpdates).then(results =>
      // TODO: return individual fails
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

export default saveSubTopicUpdates;
