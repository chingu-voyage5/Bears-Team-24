import { topics, subTopics } from './topicData';

export const getTopics = () => Promise.resolve(topics);

export const getSubTopics = () => Promise.resolve(subTopics);
