import React from 'react';
import { shallow } from 'enzyme';

import Tab from '.';

const props = {
  active: true,
  gridArea: 'venta',
  handleClick: () => {},
  label: 'gauja',
  name: 'abava',
};

describe('Tab component', () => {
  it('should render label and checked radio button', () => {
    const wrapper = shallow(<Tab {...props} />);

    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('Radio').length).toBe(1);
    expect(wrapper.find('Radio').props().defaultChecked).toBe(true);
  });

  it('should register click', () => {
    props.handleClick = jest.fn();
    const wrapper = shallow(<Tab {...props} />);

    wrapper.find('Radio').simulate('click');

    expect(props.handleClick).toHaveBeenCalled();
  });
});
