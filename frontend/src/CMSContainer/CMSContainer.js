import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getArticleList, searchArticles } from './actions';
import ContentArea from '../ContentArea';
import { Highlight } from '../SearchResults/styled';
import Search from '../Search';
import SearchResults from '../SearchResults';
import Sidebar from '../Sidebar';
import { ContentWrapper, SearchStatus, Wrapper } from './styled';

export default class CMSContainer extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    articleList: [],
    searchResults: [],
    showSearchResults: false,
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

  handleSearchClick = id => {
    this.props.history.push(`/cms/${id}`);
    this.setState(() => ({
      showSearchResults: false,
    }));
  };

  handleSearch = query => {
    searchArticles(query).then(searchResults => {
      this.setState(() => ({
        searchResults,
        searchQuery: query,
        showSearchResults: true,
      }));
    });
  };

  hideSearchResults = () => {
    this.setState(() => ({
      showSearchResults: false,
    }));
  };

  render() {
    const {
      articleList,
      searchQuery,
      searchResults,
      showSearchResults,
    } = this.state;

    return (
      <Wrapper>
        <Route
          path="/cms/:id?"
          render={p => (
            <Sidebar
              {...p}
              articles={articleList}
              onClick={this.hideSearchResults}
            />
          )}
        />
        <ContentWrapper>
          <Search onSubmit={this.handleSearch} />
          {showSearchResults ? (
            <Fragment>
              <SearchStatus>
                {searchResults.length
                  ? `Found ${searchResults.length} topics containing `
                  : `Nothing found for: `}
                <Highlight bold>{searchQuery}</Highlight>
              </SearchStatus>
              <SearchResults
                results={searchResults}
                query={searchQuery}
                onClick={this.handleSearchClick}
              />
            </Fragment>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}
