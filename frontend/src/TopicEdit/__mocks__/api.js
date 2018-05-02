/* eslint-disable import/prefer-default-export */

export const getTopics = () =>
  Promise.resolve([{ _id: '1', name: 'Voyage', order: 1 }]);

export const getSubTopics = () =>
  Promise.resolve(
    // eslint-disable-next-line camelcase
    [{ _id: '2', parent: '1', name: 'About this wiki', order: 1 }]
  );
