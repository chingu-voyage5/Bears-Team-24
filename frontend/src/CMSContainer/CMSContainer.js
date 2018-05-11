import React from 'react';
import { Route } from 'react-router-dom';

import { getArticleList } from './actions';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

export default class CMSContainer extends React.Component {
  state = {
    articleList: [],
  };

  componentDidMount = () => {
    this.getArticles().then(articleList => {
      this.setState({ articleList });
    });
  };
  // eslint-disable-next-line
  getArticles() {
    return getArticleList();
  }

  render() {
    const { articleList } = this.state;

    return (
      <Wrapper>
        <Route
          path="/cms/:id?"
          render={p => <Sidebar {...p} articles={articleList} />}
        />
        <Route
          exact
          path="/cms"
          render={() => (
            <div>
              <h1>Welcome</h1>
            </div>
          )}
        />
        <Route path="/cms/:id" component={ContentArea} />
      </Wrapper>
    );
  }
}
