/* eslint-disable */
import React from 'react';

import { Wrapper } from './styled';

class StateSetup extends React.Component {
  state = {
    isLoggedIn: this.props.isLoggedIn,
    username: this.props.username,
  };
  handleLogin = e => {
    this.props.handleLogin(e.target.checked);
  };

  handleUsername = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
    this.props.handleUsername(username);
  };

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <Wrapper>
        <span>Change App.js state:</span>
        <label>
          <input
            type="checkbox"
            onChange={this.handleLogin}
            defaultChecked={isLoggedIn}
          />isLoggedIn
        </label>
        <label>
          Username:{' '}
          <input type="text" onChange={this.handleUsername} value={username} />
        </label>
      </Wrapper>
    );
  }
}

export default StateSetup;
