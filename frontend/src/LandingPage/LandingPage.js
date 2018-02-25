// This file show basic layout for react component
// It's a bit of a contrived example because airbnb linter is serously stict
// ... but that's a good thing :)
// NORMALLY, I would create a branch: `feature/LandingPage` to do this work
// I would push the branch at the end of each day, regardless of how complete it is
// When I think it is working and ready to be merged into develop, I would create
// a pull request in github for the branch and add all team members as reviewers.

import React from 'react';
import styled from 'styled-components';

export default class LandingPage extends React.Component {
  state = {
    myAlign: 'center'
  };
  testFunc = () => {
    const test = this.state.myAlign;
    return test;
  };
  render = () => {
    const Heading = styled.h1`
      text-align: ${this.testFunc()};
    `;
    return (
      <div>
        <Heading>Welcome to chingu CMS</Heading>
      </div>
    );
  };
}
