import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
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

class App extends Component {
  state = {
    article: articleMockData,
    articles: articlesMockData,
    assetData: assetMockData,
    assets: assetsMockData,
    isLoggedIn: true,
    username: 'Guest',
  };

  componentDidMount = () => {
    actions
      .getUser()
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
    actions.logout().then(() => {
      this.setState({ isLoggedIn: false, username: 'Guest' });
    });
    return <Redirect to="/" />;
  };

  // handleLogin = isLoggedIn => {
  //   this.setState(() => ({ isLoggedIn }));
  // };
  //
  // handleUsername = username => {
  //   this.setState(() => ({ username }));
  // };

  render() {
    const {
      article,
      articles,
      assetData,
      assets,
      isLoggedIn,
      username,
      users,
    } = this.state;

    return (
      <Router>
        <React.Fragment>
          <Navbar isLoggedIn={isLoggedIn} username={username} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              exact
              path="/pages"
              render={routeProps => (
                <Articles {...routeProps} data={articles} />
              )}
            />
            <Route
              exact
              path="/pages/new"
              render={() => <ArticleEdit empty />}
            />
            <Route
              path="/pages/:id"
              render={() => <ArticleEdit data={article} />}
            />
            <Route
              exact
              path="/users"
              render={() => <UserList data={users} />}
            />
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
            <Route path="/assets" render={() => <div>Assets component</div>} />
            <Route path="/cms" component={CMSContainer} />
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
