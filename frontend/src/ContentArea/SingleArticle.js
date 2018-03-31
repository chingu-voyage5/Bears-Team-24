import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

export default class SingleArticle extends React.Component {
  render() {
    const articles = JSON.parse(localStorage.getItem('allArticles'));
    const index = JSON.parse(localStorage.getItem('articleIndex'));
    const content = articles[index[this.props.id]].content || 'Empty article';
    const options = { __html: marked(content) };

    return <div dangerouslySetInnerHTML={options} />;
  }
}

SingleArticle.propTypes = {
  id: PropTypes.string.isRequired,
};
