import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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

import articleMockData from './_mockData/article.json';
import articlesMockData from './_mockData/articles.json';
import assetMockData from './_mockData/assetMockData.json';
import assetsMockData from './_mockData/assets.json';
import usersMockData from './_mockData/users.json';

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  guestUser = { _id: '0', username: 'Guest' };
  state = {
    article: articleMockData,
    articles: articlesMockData,
    assetData: assetMockData,
    assets: assetsMockData,
    users: usersMockData,
    isLoggedIn: true,
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
    this.setState({ user, isLoggedIn: true });
  };
  logout = () => {
    actions.logout().then(() => {
      this.setState({ isLoggedIn: false, user: this.guestUser });
    });
    return <Redirect to="/" />;
  };

  render() {
    const {
      article,
      articles,
      assetData,
      assets,
      isLoggedIn,
      users,
      user = this.guestUser,
    } = this.state;
    return (
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
          <Route
            exact
            path="/pages"
            render={r => <Articles {...r} data={articles} />}
          />
          <Route exact path="/pages/new" render={() => <ArticleEdit empty />} />
          <Route
            path="/pages/:id"
            render={() => <ArticleEdit data={article} />}
          />
          <Route exact path="/users" render={() => <UserList data={users} />} />
          <Route
            path="/users/:id"
            render={props => (
              <UserPage userId={props.match.params.id} data={users} />
            )}
          />
          <Route
            exact
            path="/assets"
            render={r => <Assets {...r} data={assets} />}
          />
          <Route exact path="/assets/new" component={AssetEdit} />
          <Route
            path="/assets/:id"
            render={() => <AssetEdit {...assetData} />}
          />
          <Route path="/cms" component={CMSContainer} />
          <Route
            path="/login"
            render={() => <Login setUser={this.setUser} />}
          />
          <Route path="/logout" render={() => <div>Logout component</div>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
