import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const activeClassName = 'selected';

// Temp variables
const $primaryLinkColor = '#bbb';
const $activeLinkColor = '#fff';

export const DrawerLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: #333;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }

  &.${activeClassName} {
    color: #333;
    font-weight: 600;
  }
`;

export const Greeting = styled.span`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 27px;
  margin-left: auto;
  padding-top: 5px;
`;

export const NavLinkStyled = styled(NavLink).attrs({
  activeClassName,
})`
  align-items: center;
  box-sizing: border-box;
  color: ${$primaryLinkColor};
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin: 0 2rem;
  padding: 0.5rem;
  padding-bottom: 0.2rem;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    text-decoration: none;
  }

  &.${activeClassName} {
    color: ${$activeLinkColor};
  }
`;

export const Wrapper = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
`;
