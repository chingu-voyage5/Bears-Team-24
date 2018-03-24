import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Articles from './Articles';
import ArticleEdit from './ArticleEdit';
import Assets from './Assets';
import AssetEdit from './AssetEdit';
import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';
import StateSetup from './_StateSetup';
import CMSContainer from './CMSContainer';
import { UserList, UserPage } from './UserList';

import articleMockData from './_mockData/article.json';
import articlesMockData from './_mockData/articles.json';
import usersMockData from './_mockData/users.json';

// This is just a mock showing a simple react component included.
// Viktor may remove this file when he does the routing, but you can
// still use this to see your component. Simply replace <LandingPage/>
// with the name of your component, e.g. <Sidebar />

class App extends Component {
  state = {
    article: articleMockData,
    articles: articlesMockData,
    isLoggedIn: true,
    username: 'fake_user',
    users: usersMockData,
  };

  handleLogin = isLoggedIn => {
    this.setState(() => ({ isLoggedIn }));
  };

  handleUsername = username => {
    this.setState(() => ({ username }));
  };

  render() {
    const {
      article,
      articles,
      isLoggedIn,
      username,
      users,
    } = this.state;

    return (
      <Router>
        <React.Fragment>
          <StateSetup
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogin={this.handleLogin}
            handleUsername={this.handleUsername}
          />
          <Route
            render={r => (
              <Navbar isLoggedIn={isLoggedIn} username={username} {...r} />
            )}
          />
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
            <Route exact path="/assets" render={r => <Assets {...r} />} />
            <Route exact path="/assets/new" component={AssetEdit} />
            <Route
              path="/assets/:id"
              render={props => <AssetEdit id={props.match.params.id} />}
            />
            <Route path="/cms" component={CMSContainer} />
            <Route path="/login" component={Login} />
            <Route path="/logout" render={() => <div>Logout component</div>} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
