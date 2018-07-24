import React, { Component, createContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AuthRoute from './AuthRoute';
import actions from './actions';
import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';
import Articles, { ArticleChangeList } from './Articles';
import ArticleEdit, { ArticleChangeEdit } from './ArticleEdit';
import Assets from './Assets';
import AssetEdit from './AssetEdit';
import CMSContainer from './CMSContainer';
import TopicEdit from './TopicEdit';
import { UserList, UserPage } from './User';

import theme from './theme';

const ADMIN = 'admin';
// we need to consolidate trust levels
const TRUSTED = 'moderator';

export const Context = createContext();

/**
 * authing routes entered into address bar.
    1. We can't go to auth route whilst we're waiting for auto login. If we do
        AuthRoute is triggered before we're logged in and sends us to login page.
    2. Additionally, on startup, waitingForLogin is false, so AuthRoute is
        So we use startup flag to prevent AuthRoute being called until we're sure
        auto login has run.
 */
class App extends Component {
  /* eslint-disable react/sort-comp */
  guestUser = { _id: '0', username: 'Guest' };
  state = {
    startup: true,
    isLoggedIn: false,
    isAdmin: false,
    isTrusted: false,
    waitingForLogin: false,
    user: this.guestUser,
    windowWidth: window.innerWidth,
  };
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);

    if (this.state.waitingForLogin) {
      return;
    }
    this.setState({ waitingForLogin: true });
    actions
      .getUser()
      .then(res => {
        if (res.success) {
          this.setUser(res.user);
        } else {
          this.setUser(null);
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log('auto login error:', e);
        this.setUser(null);
      });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  setUser = user => {
    if (user === null) {
      this.setState({
        user: this.guestUser,
        isLoggedIn: false,
        isAdmin: false,
        isTrusted: false,
        startup: false,
        waitingForLogin: false,
      });
    } else {
      this.setState({
        user,
        isLoggedIn: true,
        isAdmin: user.role === ADMIN,
        isTrusted: user.role === ADMIN || user.role === TRUSTED,
        startup: false,
        waitingForLogin: false,
      });
    }
  };

  logout = () => {
    actions
      .logout()
      .then(() => {
        this.setUser(null);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        this.setUser(null);
      });
    return <Redirect to="/" />;
  };

  render() {
    const {
      isLoggedIn,
      isAdmin,
      isTrusted,
      startup,
      waitingForLogin,
      user = this.guestUser,
      windowWidth,
    } = this.state;
    if (waitingForLogin || startup) {
      return <h1>Loading ...</h1>;
    }
    return (
      <BrowserRouter>
        <Context.Provider value={windowWidth}>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <Route
              render={r => (
                <Navbar
                  isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  isTrusted={isTrusted}
                  userId={user._id}
                  username={user.username}
                  {...r}
                />
              )}
            />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <AuthRoute
                exact
                isLoggedIn={isLoggedIn}
                path="/articles"
                render={r => <Articles {...r} />}
              />
              <AuthRoute
                exact
                isLoggedIn={isLoggedIn}
                path="/articles/new"
                render={r => <ArticleEdit {...r} empty user={user} />}
              />
              <AuthRoute
                isLoggedIn={isLoggedIn}
                path="/articles/:id"
                render={props => <ArticleEdit id={props.match.params.id} />}
              />
              <AuthRoute
                exact
                isLoggedIn={isTrusted}
                path="/requests"
                render={r => <ArticleChangeList {...r} />}
              />
              <AuthRoute
                isLoggedIn={isTrusted}
                path="/requests/:id"
                render={props => (
                  <ArticleChangeEdit {...props} id={props.match.params.id} />
                )}
              />
              <AuthRoute
                exact
                isLoggedIn={isAdmin}
                path="/users"
                render={r => <UserList {...r} />}
              />
              <Route
                path="/users/:id"
                render={props => <UserPage userId={props.match.params.id} />}
              />
              <AuthRoute
                exact
                isLoggedIn={isLoggedIn}
                path="/assets"
                render={r => <Assets {...r} />}
              />
              <AuthRoute
                exact
                isLoggedIn={isLoggedIn}
                path="/assets/new"
                render={r => <AssetEdit {...r} user={user} />}
              />
              <AuthRoute
                isLoggedIn={isLoggedIn}
                path="/assets/:id"
                render={props => <AssetEdit id={props.match.params.id} />}
              />
              <AuthRoute
                isLoggedIn={isLoggedIn}
                path="/topic"
                component={TopicEdit}
              />
              <Route path="/cms" component={CMSContainer} />
              <Route
                path="/login"
                render={() => <Login setUser={this.setUser} />}
              />
              <Route path="/logout" render={this.logout} />
            </Switch>
          </React.Fragment>
        </MuiThemeProvider>
        </Context.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
