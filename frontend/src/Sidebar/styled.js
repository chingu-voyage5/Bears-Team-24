import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'selected';

const $sidebarBackground = '#e2e2e2';

export const Details = styled.details`
  cursor: default;
  margin-left: 1rem;
`;

export const Summary = styled.summary`
  outline: none;
`;

export const Wrapper = styled.nav`
  padding: 2em 2em;
  background-color: ${$sidebarBackground};
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 14px;
  min-width: 250px;
`;

export const LI = styled.li`
  list-style-type: none;
  margin-left: 1rem;
`;

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

export default Wrapper;
