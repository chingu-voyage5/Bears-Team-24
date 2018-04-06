import React from 'react';
import PropTypes from 'prop-types';
import SingleArticle from './SingleArticle';
import Topic from './Topic';
import Root from './Root';

export default class ContentArea extends React.Component {
  render() {
    const { articleId, articleIndex } = this.props;
    let view = 'none';
    const number =
      articleIndex[articleId] || 0;

    if (articleId && number) {
      view = <SingleArticle articles={this.props.articles} index={number - 1} />;
    } else if (articleId) {
      //  cms/.....
      view = <p>Article not found</p>;
    } else {
      // cms/
      view = <SingleArticle articles={this.props.articles} index={0} />;
    }
    return (
      <div>
        <section className="content-area">{view}</section>
      </div>
    );
  }
}

ContentArea.propTypes = {
  articleId: PropTypes.string,
};

ContentArea.defaultProps = {
  articleId: '',
};
