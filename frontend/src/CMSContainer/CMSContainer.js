import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { getArticleList } from './actions';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

export default class CMSContainer extends React.Component {
  state = {
    articleList: [],
  };

  componentDidMount = () => {
    getArticleList().then(articleList => {
      this.setState({ articleList });
    });
  };

  render() {
    const { articleList } = this.state;
    return (
      <Wrapper>
        <BrowserRouter>
          <React.Fragment>
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
          </React.Fragment>
        </BrowserRouter>
      </Wrapper>
    );
  }
}
