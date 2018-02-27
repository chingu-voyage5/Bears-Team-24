import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Navbar from '.';

describe('Navbar', () => {
  it('should render full Navbar for a logged-in user', () => {
    const props = {
      isLoggedIn: true,
      username: 'foo',
    };

    const wrapper = mount(
      <MemoryRouter>
        <Navbar {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('a')).toHaveLength(6);
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

  it('should render guest Navbar if no props passed', () => {
    const GREETING = 'Hi, Guest';
    const FIRST_LINK = 'Home';
    const SECOND_LINK = 'CMS';
    const THIRD_LINK = 'Login';

    const wrapper = mount(
      <MemoryRouter>
        <Navbar />
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

    expect(wrapper.find('span').text()).toEqual(GREETING);
  });
});
