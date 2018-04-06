import React from 'react';
import PropTypes from 'prop-types';
import SingleArticle from './SingleArticle';
import Topic from './Topic';
import Root from './Root';

export default class ContentArea extends React.Component {
  render() {
    const { articleId } = this.props;
    let view = 'none';
    const number = JSON.parse(localStorage.getItem('articleIndex'))[articleId] || '';

	 if (number) {
      view = <SingleArticle index={number-1} />;
    } else {
      view = <p>Article not found</p>;
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
