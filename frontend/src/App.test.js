import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const comp = shallow(<App />);
  const ele = comp.find('div');
  expect(ele.length).toEqual(0);
});
