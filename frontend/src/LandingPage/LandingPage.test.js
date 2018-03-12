import React from 'react';
import renderer from 'react-test-renderer';
import LandingPage from './LandingPage';
import 'jest-styled-components';

test('renders LandingPage', () => {
  const pg = renderer.create(<LandingPage />).toJSON();
  expect(pg).toMatchSnapshot();
});
