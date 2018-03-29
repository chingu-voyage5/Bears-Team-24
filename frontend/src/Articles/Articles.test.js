import React from 'react';
import { shallow } from 'enzyme';

import Articles, { renderRows } from './Articles';

const routerProps = {
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/foo',
  },
};

const data = [
  {
    _id: '123abc',
    content: 'Lorem ipsum',
    creator: { _id: '1', username: 'Foo' },
    title: 'title1',
    topic: 'topic 1',
  },
  {
    _id: '456def',
    content: 'Dolor sit',
    creator: { _id: '2', username: 'Baz' },
    title: 'title2',
    topic: 'topic 2',
  },
];

const noop = () => {};

describe('Articles list rows', () => {
  it('should renderRows', () => {
    const wrapper = renderRows(data, noop);

    expect(wrapper.length).toEqual(2);
  });

  it('should handle empty data', () => {
    const wrapper = renderRows([], noop);

    expect(wrapper.length).toEqual(0);
  });
});
describe('Articles Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('should render Button', () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const wrapper = shallow(<Articles {...routerProps} />);

    const button = wrapper.find('Button');
    expect(button.length).toEqual(1);
  });

  it('should navigate to article create page', () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const wrapper = shallow(<Articles {...routerProps} />);

    wrapper.instance().handleNewArticle();

    expect(wrapper.instance().props.history.push.mock.calls[0][0]).toEqual(
      `${routerProps.location.pathname}/new`
    );
  });
});
