import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import actions from './actions';
import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';

class App extends Component {
  state = {
    isLoggedIn: false,
    username: 'Guest',
  };

  componentDidMount = () => {
    actions.getUser()
      .then(res => {
        if (res.success) {
          this.setState({ isLoggedIn: true, username: res.username });
        } else {
          this.setState({ isLoggedIn: false, username: 'Guest' });
        }
      })
      .catch(() => {
        this.setState({ isLoggedIn: false, username: 'Guest' });
      });
  };

  logout = () => {
    actions.logout()
      .then(() => {
        this.setState({ isLoggedIn: false, username: 'Guest' });
      });
    return (
      <Redirect to="/" />
    );
  };

  // handleLogin = isLoggedIn => {
  //   this.setState(() => ({ isLoggedIn }));
  // };
  //
  // handleUsername = username => {
  //   this.setState(() => ({ username }));
  // };

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <Router>
        <React.Fragment>
          <Navbar isLoggedIn={isLoggedIn} username={username} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/pages" render={() => <div>Pages component</div>} />
            <Route path="/users" render={() => <div>Users component</div>} />
            <Route path="/assets" render={() => <div>Assets component</div>} />
            <Route path="/cms" render={() => <div>CMS component</div>} />
            <Route path="/login" component={Login} />
            <Route path="/logout" render={this.logout} />
          </Switch>
        </React.Fragment>
      </Router>
    );

    // <StateSetup
    //   isLoggedIn={isLoggedIn}
    //   username={username}
    //   handleLogin={this.handleLogin}
    //   handleUsername={this.handleUsername}
    // />
  }
}

export default App;
