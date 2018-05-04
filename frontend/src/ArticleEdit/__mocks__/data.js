export const topics = [
  { _id: '1', name: 'Voyage', order: 1 },
  { _id: '2', name: 'PMRoK', order: 2 },
];
export const subTopics = [
  { _id: '10', parent: '1', name: 'About wiki', order: 1 },
  { _id: '11', parent: '1', name: 'About Voyages', order: 2 },
  { _id: '12', parent: '1', name: 'About PMRoK', order: 1 },
];
export const article = {
  _id: '43039ac8d0a244719d9d31e0731bcbe8',
  active: true,
  created: '1498771528',
  creator: {
    _id: '85e026bbd79b46ce990dbb956490e8d0',
    username: 'viktor',
  },
  title: 'About this wiki',
  order: 1,
  topic: topics[0],
  sub_topic: subTopics[0],
  content: 'test content',
};
