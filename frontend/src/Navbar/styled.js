import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const activeClassName = 'selected';

// Temp variables
const $primaryLinkColor = '#bbb';
const $activeLinkColor = '#fff';

export const Greeting = styled.span`
  margin-left: auto;
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
