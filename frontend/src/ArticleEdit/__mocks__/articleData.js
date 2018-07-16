import { topics, subTopics } from '../../TopicEdit/__mocks__/topicData';

const article = {
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
  edit_lock: false,
};

export default article;
