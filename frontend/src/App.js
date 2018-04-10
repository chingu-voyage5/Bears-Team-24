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

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  guestUser = { _id: '0', username: 'Guest' };
  state = {
    article: {},
    articles: [],
    articleIndex: {},
    isLoggedIn: false,
    user: this.guestUser,
    cmsReady: false,
  };

  componentDidMount = () => {
    actions
      .getUser()
      .then(res => {
        if (res.success) {
          this.setState({ isLoggedIn: true, user: res.user });
        } else {
          this.setState({ isLoggedIn: false, user: this.guestUser });
        }
      })
      .catch(() => {
        this.setState({ isLoggedIn: false, user: this.guestUser });
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
      article,
      articles,
      articleIndex,
      cmsReady,
      isLoggedIn,
      user = this.guestUser,
    } = this.state;
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
