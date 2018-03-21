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
import assetMockData from './_mockData/assetMockData.json';
import assetsMockData from './_mockData/assets.json';

// This is just a mock showing a simple react component included.
// Viktor may remove this file when he does the routing, but you can
// still use this to see your component. Simply replace <LandingPage/>
// with the name of your component, e.g. <Sidebar />

class App extends Component {
  state = {
    article: articleMockData,
    articles: articlesMockData,
    assetData: assetMockData,
    assets: assetsMockData,
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
    const {
      article,
      articles,
      assetData,
      assets,
      isLoggedIn,
      username,
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
            <Route exact path="/users" render={() => <UserList />} />
            <Route
              path="/users/:id"
              render={props => <UserPage userId={props.match.params.id} />}
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
            <Route path="/logout" render={() => <div>Logout component</div>} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
