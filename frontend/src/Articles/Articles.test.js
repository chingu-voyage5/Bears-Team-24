import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Articles from './Articles';

const articles = [
  {
    _id: '5abe00d98c3fc76f593741e0',
    creator: { _id: '5abe00d98c3fc76f593741df', username: 'sys' },
    topic: 'Voyage',
    sub_topic: 'About this wiki',
    title: 'Home',
  },
  {
    _id: '5abe00d98c3fc76f593741e2',
    creator: { _id: '5abe00d98c3fc76f593741df', username: 'sys' },
    topic: 'Voyage',
    sub_topic: 'About Voyages',
    title: 'About Voyages',
  },
];

const props = {
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/foo',
  },
};

describe('Articles list', () => {
  it('should match snapshot', () => {
    jest
      .spyOn(Articles.prototype, 'fetchData')
      .mockImplementation(() => new Promise(resolve => resolve(articles)));

    const wrapper = shallow(<Articles {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
