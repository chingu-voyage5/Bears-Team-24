import React from 'react';
import Collapsible from './Collapsible';
import {Wrapper} from './styled';
const Sidebar = () => (
  <Wrapper>
    <Collapsible title="About this wiki">
      <a>Lorem ipsum dolor sit </a>
    </Collapsible>
    <Collapsible title="About Voyages">
      <a>Lorem ipsum dolor sit </a>
    </Collapsible>
    <Collapsible title="Project Setup">
      <a>Lorem ipsum dolor sit </a>
    </Collapsible>
    <Collapsible title="Development Sprints">
      <a>Lorem ipsum dolor sit </a>
    </Collapsible>
    <Collapsible title="Project Closure">
      <a>Lorem ipsum dolor sit </a>
    </Collapsible>
    <Collapsible title="Tools & Resources">
      <a>Lorem ipsum dolor sit </a>
    </Collapsible>
  </Wrapper>  
);

export default Sidebar;