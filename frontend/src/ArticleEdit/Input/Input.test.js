import React from 'react';
import { shallow } from 'enzyme';

import Input from '.';

const props = {
  value: 'Bradypus variegatus',
  label: 'pilosa',
  name: 'paresseux',
  onChange: () => {},
};

describe('Input component', () => {
  it('should render label and input field', () => {
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('InputField').length).toBe(1);
  });
});
