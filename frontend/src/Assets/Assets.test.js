import React from 'react';
import { shallow } from 'enzyme';

import Assets from '.';

const routerProps = {
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/foo',
  },
};

describe('Assets component', () => {
  it('should render a Button and ReactTable', () => {
    const wrapper = shallow(<Assets {...routerProps} />);

    expect(wrapper.find('Button').length).toEqual(1);
    expect(wrapper.find('ReactTable').length).toEqual(1);
  });
});
