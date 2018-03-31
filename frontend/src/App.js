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
    isLoggedIn: false,
    user: this.guestUser,
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
    const { isLoggedIn, user = this.guestUser } = this.state;
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
              redirect="/login"
              render={r => <Articles {...r} />}
            />
            <AuthRoute
              exact
              isLoggedIn={isLoggedIn}
              path="/articles/new"
              redirect="/login"
              render={r => <ArticleEdit {...r} empty user={user} />}
            />
            <AuthRoute
              isLoggedIn={isLoggedIn}
              path="/articles/:id"
              redirect="/login"
              render={props => <ArticleEdit id={props.match.params.id} />}
            />
            <AuthRoute
              exact
              isLoggedIn={isLoggedIn}
              path="/users"
              redirect="/login"
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
              redirect="/login"
              render={r => <Assets {...r} />}
            />
            <AuthRoute
              exact
              isLoggedIn={isLoggedIn}
              path="/assets/new"
              redirect="/login"
              render={r => <AssetEdit {...r} user={user} />}
            />
            <AuthRoute
              isLoggedIn={isLoggedIn}
              path="/assets/:id"
              redirect="/login"
              render={props => <AssetEdit id={props.match.params.id} />}
            />
            <Route path="/cms" component={CMSContainer} />
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
