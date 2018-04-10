import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import actions from './actions';
import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';
import Articles from './Articles';
import ArticleEdit from './ArticleEdit';
import Assets from './Assets';
import AssetEdit from './AssetEdit';
import CMSContainer from './CMSContainer';
import { UserList, UserPage } from './UserList';

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
    articles: [],
    articleIndex: {},
    startup: true,
    isLoggedIn: false,
    waitingForLogin: false,
    user: this.guestUser,
    cmsReady: false,
  };
  componentDidMount = () => {
    if (this.state.waitingForLogin) {
      return;
    }
    this.setState({ waitingForLogin: true });
    actions
      .getUser()
      .then(res => {
        if (res.success) {
          this.setState({
            startup: false,
            waitingForLogin: false,
            isLoggedIn: true,
            user: res.user,
          });
        } else {
          this.setState({
            startup: false,
            waitingForLogin: false,
            isLoggedIn: false,
            user: this.guestUser,
          });
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log('auto login error:', e);
        this.setState({
          startup: false,
          waitingForLogin: false,
          isLoggedIn: false,
          user: this.guestUser,
        });
      });

    actions.checkLocalStorage().then(loaded => {
      this.setState({
        cmsReady: loaded,
        articles: loaded ? JSON.parse(localStorage.getItem('allArticles')) : [],
        articleIndex: loaded
          ? JSON.parse(localStorage.getItem('articleIndex'))
          : {},
      });
    });
  };

  setUser = user => {
    if (user === null) {
      this.setState({ user: this.guestUser, isLoggedIn: false });
    } else {
      this.setState({ user, isLoggedIn: true });
    }
  };

  logout = () => {
    actions
      .logout()
      .then(() => {
        this.setState({ isLoggedIn: false, user: this.guestUser });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
    return <Redirect to="/" />;
  };

  render() {
    const {
      articles,
      articleIndex,
      cmsReady,
      isLoggedIn,
      startup,
      waitingForLogin,
      user = this.guestUser,
    } = this.state;
    if (waitingForLogin || startup) {
      return <h1>Loading ...</h1>;
    }
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route
            render={r => (
              <Navbar
                isLoggedIn={isLoggedIn}
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
              isLoggedIn={isLoggedIn}
              path="/users"
              render={() => <UserList />}
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
            <Route
              exact
              path="/cms"
              render={props => (
                <CMSContainer
                  {...props}
                  articles={articles}
                  articleIndex={articleIndex}
                  cmsReady={cmsReady}
                />
              )}
            />
            <Route
              path="/cms/:articleId"
              render={props => (
                <CMSContainer
                  {...props}
                  articles={articles}
                  articleIndex={articleIndex}
                  cmsReady={cmsReady}
                />
              )}
            />
            <Route
              path="/login"
              render={() => <Login setUser={this.setUser} />}
            />
            <Route path="/logout" render={this.logout} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
