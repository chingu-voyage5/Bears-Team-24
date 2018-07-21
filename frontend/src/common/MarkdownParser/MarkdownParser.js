import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import { Wrapper } from './styled';

const propTypes = {
  content: PropTypes.string.isRequired,
};

const MarkdownParser = ({ content }) => (
  <Wrapper dangerouslySetInnerHTML={{ __html: marked(content) }} />
);

MarkdownParser.propTypes = propTypes;

export default MarkdownParser;
