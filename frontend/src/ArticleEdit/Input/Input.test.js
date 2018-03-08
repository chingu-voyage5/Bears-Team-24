import React from 'react';
import { shallow } from 'enzyme';

import Input from '.';

const props = {
  defaultValue: 'Bradypus variegatus',
  innerRef: () => {},
  label: 'pilosa',
  name: 'paresseux',
};

describe('Input component', () => {
  it('should render label and input field', () => {
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('InputField').length).toBe(1);
  });
});
