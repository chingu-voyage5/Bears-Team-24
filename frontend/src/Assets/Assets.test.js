import React from 'react';
import { shallow } from 'enzyme';

import Assets from './Assets';

const assets = [
  {
    _id: '91053eef8dfa4f8684c3b38bc90268be',
    content_type: 'audio',
    creator: {
      _id: '123',
      username: 'Donnie',
    },
    title: 'Duis at velit eu est congue elementum.',
    created: 1507391163000,
  },
  {
    _id: '24a5310c7db0429abef5ca7d529c9713',
    content_type: 'video',
    creator: {
      _id: '123',
      username: 'Splinter',
    },
    title: 'Sed sagittis.',
    created: 1486505062000,
  },
];

const props = {
  history: {
    push: jest.fn(),
  },
  location: {
    pathname: '/foo',
  },
};

describe('Assets component', () => {
  it('should match snapshot', () => {
    jest
      .spyOn(Assets.prototype, 'fetchData')
      .mockImplementation(() => new Promise(resolve => resolve(assets)));

    const wrapper = shallow(<Assets {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
