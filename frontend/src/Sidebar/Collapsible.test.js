/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';

import Collapsible from './Collapsible';


it('should create elements', () => {
  const d = renderer
    .create(
      <Collapsible id="" title="test title" open={false} expanded={() => {}} >
        {{ _id: '1', title: 'Some article title' }}
      </Collapsible>
    )
    .toJSON();

  expect(d).toMatchSnapshot();
});
