import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const activeClassName = 'selected';

// Temp variables
const $primaryLinkColor = '#666';
const $activeLinkColor = '#333';
const $navbarBackground = '#e2e2e2';

export const Greeting = styled.span`
  margin-left: auto;
`;

export const NavLinkStyled = styled(NavLink).attrs({
  activeClassName,
})`
  align-items: center;
  border-bottom: 2px solid transparent;
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

  &.${activeClassName} {
    border-bottom: 2px solid #15df89;
    color: ${$activeLinkColor};
  }
`;

export const Wrapper = styled.nav`
  align-items: center;
  background-color: ${$navbarBackground};
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: space-around;
`;
