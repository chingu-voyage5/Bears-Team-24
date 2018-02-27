import React from 'react';
import { mount } from 'enzyme';

import Input from '.';

const props = {
  name: 'foo',
};

describe('Input', () => {
  it('shuld render an text input inside a label', () => {
    const wrapper = mount(<Input {...props} />);
    const inputField = wrapper.find('input');

    expect(wrapper.find('label').length).toBe(1);
    expect(inputField.length).toBe(1);
    expect(inputField.prop('type')).toEqual('text');
  });

  it('should render a password input', () => {
    props.type = 'password';

    const wrapper = mount(<Input {...props} />);
    const inputField = wrapper.find('input');

    expect(inputField.prop('type')).toEqual('password');
  });

  it('should render a sumbit input', () => {
    props.type = 'submit';

    const wrapper = mount(<Input {...props} />);
    const inputField = wrapper.find('input');

    expect(inputField.prop('type')).toEqual('submit');
  });

  it('should render a disabled input', () => {
    props.disabled = true;

    const wrapper = mount(<Input {...props} />);
    const inputField = wrapper.find('input');

    expect(inputField.prop('disabled')).toEqual(true);
  });

  it('should trigger function on input change', () => {
    props.onChange = jest.fn();

    const wrapper = mount(<Input {...props} />);
    const inputField = wrapper.find('input');

    inputField.simulate('change');
    inputField.simulate('change');
    inputField.simulate('change');

    expect(props.onChange.mock.calls.length).toEqual(3);
  });
});
