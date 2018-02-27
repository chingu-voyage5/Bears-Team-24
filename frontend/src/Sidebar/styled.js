import styled from 'styled-components';

const activeClassName = 'isExpanded'

// Temp variables
const $primaryLinkColor = '#666';
const $activeLinkColor = '#333';
const $sidebarBackground = '#e2e2e2';


export const Wrapper = styled.nav`
  align-items: left;
  padding: 0 1em;
  background-color: ${$sidebarBackground};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  position: absolute;
  left: 0;
  top: 10vh;
`