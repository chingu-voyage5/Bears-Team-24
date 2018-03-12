import React from 'react';
import PropTypes from 'prop-types';

import {Link } from 'react-router-dom';
import { Greeting, NavLinkStyled, Wrapper } from './styled';

const propTypes = {
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string,
};

const defaultProps = {
  isLoggedIn: false,
  username: 'Guest',
};

const Navbar = ({ isLoggedIn, username }) => (
  <Wrapper>
    <NavLinkStyled exact to="/">
      Home
    </NavLinkStyled>
    {isLoggedIn && (
      <React.Fragment>
        <NavLinkStyled to="/pages">Pages</NavLinkStyled>
        <NavLinkStyled to={`/users/`}>Users</NavLinkStyled>
        <NavLinkStyled to="/assets">Assets</NavLinkStyled>
      </React.Fragment>
    )}
    <NavLinkStyled to="/cms">CMS</NavLinkStyled>
    <Greeting>Hi, {isLoggedIn ? <Link to={`/users/${username}`}>{username}</Link> : 'Guest'}</Greeting>
    {isLoggedIn ? (
      <NavLinkStyled to="/logout">Logout</NavLinkStyled>
    ) : (
      <NavLinkStyled to="/login">Login</NavLinkStyled>
    )}
  </Wrapper>
);

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
