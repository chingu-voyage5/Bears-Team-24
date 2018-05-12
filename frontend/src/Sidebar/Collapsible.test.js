/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Collapsible from './Collapsible';

it('should create elements', () => {
  const d = renderer
    .create(
      <Collapsible id="" title="test title" open={false} expanded={() => {}}>
        {{ _id: '1', title: 'Some article title' }}
      </Collapsible>
    )
    .toJSON();

  expect(d).toMatchSnapshot();
});

it('should expand on click', () => {
  const expand = jest.fn();
  const comp = shallow(
    <Collapsible id="" title="test title" open={false} expanded={expand}>
      {{ _id: '1', title: 'Some article title' }}
    </Collapsible>
  );
  comp.instance().onClick({ stopPropagation: () => {} });
  expect(comp).toMatchSnapshot();
  expect(expand).toHaveBeenCalled();
  expect(comp.instance().state.open).toBe(true);
});
