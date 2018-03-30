import React from 'react';
import { shallow } from 'enzyme';

import Row from '.';

const data = {
  creator: 'Foo',
  title: 'Lorem ipsum',
  topic: 'topic',
};

describe('Row Component', () => {
  it('should render passed in title and creator', () => {
    const wrapper = shallow(<Row {...data} />);
    expect(
      wrapper
        .find('Title')
        .children()
        .at(1)
        .text()
    ).toEqual(data.title);

    expect(
      wrapper
        .find('Creator')
        .children()
        .text()
    ).toEqual(data.creator);
  });
});
