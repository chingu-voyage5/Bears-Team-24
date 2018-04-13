import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

export default class SingleArticle extends React.Component {
  render() {
    const content = this.props.content || 'Empty article';
    const options = { __html: marked(content) };

    return <div dangerouslySetInnerHTML={options} />;
  }
}

SingleArticle.propTypes = {
  content: PropTypes.string,
};

SingleArticle.defaultProps = {
  content: '',
};
