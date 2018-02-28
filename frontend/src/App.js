import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';
import StateSetup from './_StateSetup';

import ContentArea from './ContentArea/ContentArea.js';

// This is just a mock showing a simple react component included.
// Viktor may remove this file when he does the routing, but you can
// still use this to see your component. Simply replace <LandingPage/>
// with the name of your component, e.g. <Sidebar />


class App extends Component {
  state = {
    isLoggedIn: true,
    username: 'fake_user',
  };

  handleLogin = isLoggedIn => {
    this.setState(() => ({ isLoggedIn }));
  };

  handleUsername = username => {
    this.setState(() => ({ username }));
  };

  render() {
    const { isLoggedIn, username } = this.state;

    return (

      <Router>
        <React.Fragment>
          <StateSetup
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogin={this.handleLogin}
            handleUsername={this.handleUsername}
          />
          <Navbar isLoggedIn={isLoggedIn} username={username} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/pages" render={() => <div>Pages component</div>} />
            <Route path="/users" render={() => <div>Users component</div>} />
            <Route path="/assets" render={() => <div>Assets component</div>} />
            <Route path="/cms" render={() => <div>CMS component</div>} />
            <Route path="/login" component={Login} />
            <Route path="/logout" render={() => <div>Logout component</div>} />
          </Switch>
        </React.Fragment>
        
      </Router>

    );
  }
}

export default App;
