import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import ContentEdit from './ContentEdit';

it('renders ContentEdit Form', () => {
  const handleFieldChange = jest.fn();
  const comp = renderer.create(
    <ContentEdit content="test content" handleFieldChange={handleFieldChange} />
  );
  const tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes tabs', () => {
  const handleFieldChange = jest.fn();
  const comp = mount(
    <ContentEdit content="test content" handleFieldChange={handleFieldChange} />
  );
  const inst = comp.instance();
  inst.handleTabSwitch(null, 1);
  expect(inst.state.edit).toBe(1);
  return Promise.resolve().then(() => {
    comp.update();
    expect(
      comp
        .find('Preview')
        .at(0)
        .childAt(0)
        .text()
    ).toBe(`test content
`);
  });
});
