import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ArticleChangeList from './ArticleChangeList';

const requests = [
  {
    _id: '5b133cf0ebd521b1d4a5144a',
    article: {
      id: '5ae27568463f344afc3ac08e',
      title: 'test article',
      topic: { id: 'topic_id', name: 'test topic' },
      sub_topic: { id: 'sub_topic_id', name: 'test sub topic' },
      content: 'TBD',
    },
    diff: [
      {
        count: 3,
        value: 'TBD',
      },
      {
        count: 5,
        added: true,
        value: ' test',
      },
    ],
    status: 'pending',
    requester: { id: '5ae34a775cfd8b560525c60c', username: 'test user' },
  },
];

const props = {
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/requests',
  },
};

describe('Article change request list', () => {
  it('should match snapshot', () => {
    jest
      .spyOn(ArticleChangeList.prototype, 'fetchData')
      .mockImplementation(() => new Promise(resolve => resolve(requests)));

    const comp = shallow(<ArticleChangeList {...props} />);
    return Promise.resolve().then(() => {
      comp.update();
      expect(toJSON(comp)).toMatchSnapshot();
    });
  });
});
