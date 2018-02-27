import React from 'react';
import Collapsible from './Collapsible';
import {Wrapper, isExpanded } from './styled';
const Sidebar = () => (
  <Wrapper>
    <Collapsible title="About this wiki">
      <p>Lorem ipsum dolor sit </p>
    </Collapsible>
    <Collapsible title="About Voyages">
      <p>Lorem ipsum dolor sit </p>
    </Collapsible>
    <Collapsible title="Project Setup">
      <p>Lorem ipsum dolor sit </p>
    </Collapsible>
    <Collapsible title="Development Sprints">
      <p>Lorem ipsum dolor sit </p>
    </Collapsible>
    <Collapsible title="Project Closure">
      <p>Lorem ipsum dolor sit </p>
    </Collapsible>
    <Collapsible title="Tools & Resources">
      <p>Lorem ipsum dolor sit </p>
    </Collapsible>
  </Wrapper>  
);

export default Sidebar;