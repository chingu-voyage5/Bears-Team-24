import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import ArticleEdit from '.';

const topics = [{ _id: '1', name: 'Pilosa', order: 1 }];
// eslint-disable-next-line camelcase
const sub_topics = [{ _id: '1', parent: '1', name: 'Folivora', order: 2 }];
const article = {
  _id: '43039ac8d0a244719d9d31e0731bcbe8',
  active: true,
  created: '1498771528',
  creator: { _id: '85e026bbd79b46ce990dbb956490e8d0', username: 'viktor' },
  contributor_list: [
    '7326fe8cff7242d094815c184aa725dd',
    'd47d214bf9f64df786b295efa9b1b45e',
    'ee2686b1d7e84c3dae4db8bd00ea8d2a',
  ],
  title: 'Bradypus variegatus',
  topic: topics[0],
  sub_topic: sub_topics[0],
  content: `## Lorem\n**ipsum** dolor _sit amet_, ~~consectetuer~~ adipiscing
    elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id
    sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie,
    hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.
    Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa
    volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt
    in, leo. Maecenas pulvinar lobortis est.`,
};

describe('ArticleEdit', () => {
  xit('should match snapshot', () => {
    jest
      .spyOn(ArticleEdit, 'getAllTopics')
      .mockImplementation(() => new Promise(resolve => resolve(topics)));

    jest
      .spyOn(ArticleEdit, 'getAllSubTopics')
      .mockImplementation(() => new Promise(resolve => resolve(sub_topics)));

    jest
      .spyOn(ArticleEdit, 'fetchData')
      .mockImplementation(() => new Promise(resolve => resolve(article)));

    const wrapper = shallow(
      <ArticleEdit id="43039ac8d0a244719d9d31e0731bcbe8" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  xit('empty component should match snapshot', () => {
    const wrapper = shallow(<ArticleEdit empty />);

    expect(wrapper).toMatchSnapshot();
  });
});
