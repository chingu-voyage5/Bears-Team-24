import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import TopicEdit from './TopicEdit';

const topic = { _id: '1', name: 'Voyage', order: 1 };
// eslint-disable-next-line camelcase
const sub_topics = { _id: '1', parent: '1', name: 'About this wiki', order: 1 };

describe('TopicEdit', () => {
  it('should match snapshot', () => {
    jest
      .spyOn(TopicEdit.prototype, 'loadTopics')
      .mockImplementation(() => new Promise(resolve => resolve(topic)));
    jest
      .spyOn(TopicEdit.prototype, 'loadSubTopics')
      .mockImplementation(() => new Promise(resolve => resolve(sub_topics)));

    const comp = shallow(<TopicEdit />);
    expect(comp).toMatchSnapshot();
  });
});
