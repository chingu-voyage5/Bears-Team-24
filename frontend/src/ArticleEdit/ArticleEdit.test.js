import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import ArticleEdit from '.';

const article = {
  _id: '43039ac8d0a244719d9d31e0731bcbe8',
  active: true,
  created: '1498771528',
  creator: '85e026bbd79b46ce990dbb956490e8d0',
  contributor_list: [
    '7326fe8cff7242d094815c184aa725dd',
    'd47d214bf9f64df786b295efa9b1b45e',
    'ee2686b1d7e84c3dae4db8bd00ea8d2a',
  ],
  title: 'Bradypus variegatus',
  topic: 'Pilosa',
  sub_topic: 'Folivora',
  content:
    '## Lorem\n**ipsum** dolor _sit amet_, ~~consectetuer~~ adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
};

describe('ArticleEdit', () => {
  it('should match snapshot', () => {
    jest
      .spyOn(ArticleEdit.prototype, 'fetchData')
      .mockImplementation(() => new Promise(resolve => resolve(article)));

    const wrapper = shallow(<ArticleEdit id="123abc" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('empty component should match snapshot', () => {
    const wrapper = shallow(<ArticleEdit empty />);

    expect(wrapper).toMatchSnapshot();
  });
});
