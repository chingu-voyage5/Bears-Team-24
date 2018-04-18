import React from 'react';
// import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import AssetEdit from '.';

describe('AssetEdit component', () => {
  xit('matches snapshot', () => {
    const tree = renderer.create(<AssetEdit />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
