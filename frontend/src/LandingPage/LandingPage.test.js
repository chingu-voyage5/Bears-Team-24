import React from 'react';
import renderer from 'react-test-renderer';
import LandingPage from './LandingPage';

test('renders LandingPage', () => {
  const pg = renderer.create(<LandingPage />).toJSON();
  expect(pg).toMatchSnapshot();
});
