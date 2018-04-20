import React from 'react';
import PropTypes from 'prop-types';
import { getTree, getChildren } from './utils';

import { Wrapper } from './styled';

const renderArticles = (articles, match) => {
  let selectedArticlePath = [];
  if (match.params.id) {
    const { id } = match.params;
    const selectedArticles = articles.filter(article => article._id === id);
    if (selectedArticles.length) {
      // eslint-disable-next-line camelcase
      const { topic, sub_topic, title } = selectedArticles[0];
      selectedArticlePath = [topic, title].concat(sub_topic.split('>'));
    }
  }
  const tree = getTree(articles);
  const articlesHtml = getChildren(tree, selectedArticlePath);
  // this.setState({ articlesHtml });
  return articlesHtml;
};

const propTypes = {
  articles: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const Sidebar = ({ articles, match }) => (
  <Wrapper>{renderArticles(articles, match)}</Wrapper>
);

Sidebar.propTypes = propTypes;

export default Sidebar;
