import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Greeting, NavLinkStyled, Wrapper } from './styled';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

const Navbar = ({ isLoggedIn, username, userId }) => (
  <Wrapper>
    <NavLinkStyled exact to="/">
      Home
    </NavLinkStyled>
    {isLoggedIn && (
      <React.Fragment>
        <NavLinkStyled to="/pages">Pages</NavLinkStyled>
        <NavLinkStyled to="/users/">Users</NavLinkStyled>
        <NavLinkStyled to="/assets">Assets</NavLinkStyled>
      </React.Fragment>
    )}
    <NavLinkStyled to="/cms">CMS</NavLinkStyled>
    <Greeting>
      Hi,{' '}
      {isLoggedIn ? <Link to={`/users/${userId}`}>{username}</Link> : 'Guest'}
    </Greeting>
    {isLoggedIn ? (
      <NavLinkStyled to="/logout">Logout</NavLinkStyled>
    ) : (
      <NavLinkStyled to="/login">Login</NavLinkStyled>
    )}
  </Wrapper>
);

Navbar.propTypes = propTypes;

export default Navbar;
