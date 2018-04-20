import styled from 'styled-components';

const $sidebarBackground = '#e2e2e2';

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

export default Wrapper;
