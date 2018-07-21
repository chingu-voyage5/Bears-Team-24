import React from 'react';
import PropTypes from 'prop-types';

import MarkdownParser from '../common/MarkdownParser';

export default class SingleArticle extends React.Component {
  render() {
    const content = this.props.content || 'Empty article';

    return <MarkdownParser content={content} />;
  }
}

SingleArticle.propTypes = {
  content: PropTypes.string,
};

SingleArticle.defaultProps = {
  content: '',
};
