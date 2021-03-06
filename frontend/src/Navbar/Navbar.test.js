import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import paths from './config';
import Navbar from '.';

// login/out nav item added programmatically
const extraNavItemCount = 1;

describe('Navbar', () => {
  it('should render full Navbar for a logged-in admin user', () => {
    const props = {
      history: { location: { pathname: '' } },
      isLoggedIn: true,
      isAdmin: true,
      isTrusted: true,
      username: 'foo',
      userId: '1',
    };

    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(paths.length + extraNavItemCount);
  });
  it('should render full Navbar for a logged-in member user', () => {
    const props = {
      history: { location: { pathname: '' } },
      isLoggedIn: true,
      isAdmin: false,
      isTrusted: false,
      username: 'foo',
      userId: '1',
    };

    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(6);
  });
  const guestProps = {
    isLoggedIn: false,
    isAdmin: false,
    isTrusted: false,
    username: 'Guest',
    userId: '0',
  };
  it('should render limited Navbar for a guest', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...guestProps} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(3);
  });

  it('should render guest nav items', () => {
    const GREETING = 'Hi, Guest';
    const FIRST_LINK = 'Home';
    const SECOND_LINK = 'CMS';
    const THIRD_LINK = 'Login';

    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...guestProps} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(3);

    expect(
      wrapper
        .find('a')
        .at(0)
        .text()
    ).toEqual(FIRST_LINK);

    expect(
      wrapper
        .find('a')
        .at(1)
        .text()
    ).toEqual(SECOND_LINK);

    expect(
      wrapper
        .find('a')
        .at(2)
        .text()
    ).toEqual(THIRD_LINK);

    expect(wrapper.find('Navbar').props().isLoggedIn).toBe(false);

    // FIXME: wrapper.find('span') should only have length one?
    xit('should render greeting', () => {
      expect(
        wrapper
          .find('span')
          .at(7)
          .text()
      ).toEqual(GREETING);
    });
  });
});
