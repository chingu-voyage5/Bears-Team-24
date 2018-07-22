import React from 'react';
import { Route } from 'react-router-dom';

import { getArticleList, searchArticles } from './actions';
import ContentArea from '../ContentArea';
import Search from '../Search';
import Sidebar from '../Sidebar';
import { ContentWrapper, Wrapper } from './styled';

export default class CMSContainer extends React.Component {
  state = {
    articleList: [],
    searchResults: [],
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

  handleSearch = query => {
    searchArticles(query).then(searchResults => {
      this.setState(() => ({ searchResults, searchQuery: query }));
    });
  };

  render() {
    const { articleList, searchResults } = this.state;

    // TEMP log search results to the console.
    // eslint-disable-next-line
    console.log(searchResults);

    return (
      <Wrapper>
        <Route
          path="/cms/:id?"
          render={p => <Sidebar {...p} articles={articleList} />}
        />
        <ContentWrapper>
          <Search onSubmit={this.handleSearch} />
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
        </ContentWrapper>
      </Wrapper>
    );
  }
}
