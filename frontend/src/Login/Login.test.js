import React from 'react';
import { mount } from 'enzyme';

import Login from '.';

// eslint-disable-next-line no-unused-vars
const props = {
  setUser: () => {},
};

describe('Login', () => {
  it('should render 2 input fields and sumbit button', () => {
    const wrapper = mount(<Login {...props} />);
    const inputFields = wrapper.find('input');

    expect(inputFields.length).toEqual(3);
    expect(inputFields.at(0).prop('type')).toEqual('text');
    expect(inputFields.at(1).prop('name')).toEqual('password1');
    expect(inputFields.at(2).prop('type')).toEqual('submit');
  });

  it('should change to register form', () => {
    const wrapper = mount(<Login {...props} />);

    expect(wrapper.state('register')).toEqual(false);
    expect(wrapper.find('input').length).toEqual(3);

    wrapper.find('button').simulate('click');

    expect(wrapper.state('register')).toEqual(true);
    expect(wrapper.find('input').length).toEqual(4);
  });
});
