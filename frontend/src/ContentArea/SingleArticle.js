import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

export default class SingleArticle extends React.Component {
  render() {
    const content =
      this.props.articles[this.props.index].content || 'Empty article';
    const options = { __html: marked(content) };

    return <div dangerouslySetInnerHTML={options} />;
  }
}

SingleArticle.propTypes = {
  index: PropTypes.number.isRequired,
  articles: PropTypes.array,
};

SingleArticle.defaultProps = {
  articles: [],
};
