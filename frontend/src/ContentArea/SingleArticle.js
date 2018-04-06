import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

export default class SingleArticle extends React.Component {
  render() {
    const articles = JSON.parse(localStorage.getItem('allArticles'));
    const content = articles[this.props.index].content || 'Empty article';
    const options = { __html: marked(content) };

    return <div dangerouslySetInnerHTML={options} />;
  }
}

SingleArticle.propTypes = {
  index: PropTypes.number.isRequired,
};
