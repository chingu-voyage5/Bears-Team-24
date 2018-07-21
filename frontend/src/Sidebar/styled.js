import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'selected';
const sidebarWidth = 320;

export const Details = styled.div`
  margin-left: 1rem;
`;

export const Dummy = styled.div`
  padding-top: 1rem;
  width: ${sidebarWidth}px;
`;

export const MenuSection = styled.div`
  background-color: #eee;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 0.2rem;
  padding: 0.5rem;
`;

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 100%;
  min-width: ${sidebarWidth}px;
  padding-top: 1rem;
`;

export const LI = styled.div`
  &:before {
    content: '\\2022';
    margin-right: 0.5rem;
  }
  align-items: center;
  display: flex;
  margin-left: 1rem;
  margin-top: 0.2rem;
  padding: 0.5rem;
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
