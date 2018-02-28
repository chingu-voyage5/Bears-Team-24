import React from 'react';
import { shallow } from 'enzyme';

import Articles, { renderRows } from '.';

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
    creator: 'Foo',
  },
  {
    _id: '456def',
    content: 'Dolor sit',
    creator: 'Baz',
  },
];

describe('Articles Component', () => {
  it('should renderRows', () => {
    const wrapper = renderRows(data, f => f);

    expect(wrapper.length).toEqual(2);
  });

  it('should render Button', () => {
    const wrapper = shallow(<Articles {...routerProps} />);

    const button = wrapper.find('Button');
    expect(button.length).toEqual(1);
  });

  xit('playground', () => {
    const wrapper = shallow(<Articles {...routerProps} />);

    wrapper.instance().handleNewPage();

    expect(wrapper.instance().props.history.push.mock.calls[0][0]).toEqual(
      `${routerProps.location.pathname}/new`
    );
  });
});
