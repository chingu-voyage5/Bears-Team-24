import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import LandingPage from './LandingPage';

test('renders LandingPage', () => {
  const pg = renderer.create(<LandingPage />).toJSON();
  expect(pg).toMatchSnapshot();
});
