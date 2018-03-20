import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Navbar from '.';

describe('Navbar', () => {
  it('should render full Navbar for a logged-in user', () => {
    const props = {
      history: { location: { pathname: '' } },
      isLoggedIn: true,
      username: 'foo',
    };

    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(7);
  });

  it('should render limited Navbar for a guest', () => {
    const props = {
      isLoggedIn: false,
    };

    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(3);
  });
});
