import React from 'react';
import PropTypes from 'prop-types';
import buildTree from './utils';

import { Wrapper } from './styled';

let articlesHtml = [];

const Sidebar = ({ articles, match, onArticleSelect }) => {
  if (articlesHtml.length === 0) {
    articlesHtml = buildTree(articles, match.params.id, onArticleSelect);
  }
  return <Wrapper>{articlesHtml}</Wrapper>;
};

Sidebar.propTypes = {
  articles: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  onArticleSelect: PropTypes.func,
};

Sidebar.defaultProps = {
  onArticleSelect: () => {},
};

export default Sidebar;
