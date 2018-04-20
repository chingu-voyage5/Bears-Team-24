import React from 'react';
import PropTypes from 'prop-types';
import { getTree, getChildren } from './utils';

import { Wrapper } from './styled';

/* eslint-disable camelcase */
export default class Sidebar extends React.Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articlesHtml: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { articles } = nextProps;
    let selectedArticlePath = [];
    if (nextProps.match.params.id) {
      const { id } = nextProps.match.params;
      const selectedArticles = articles.filter(article => article._id === id);
      if (selectedArticles.length) {
        const { topic, sub_topic, title } = selectedArticles[0];
        selectedArticlePath = [topic, title];
        if (sub_topic) {
          selectedArticlePath.push(sub_topic.split('>'));
        }
      }
    }
    const tree = getTree(articles);
    const articlesHtml = getChildren(tree, selectedArticlePath);
    this.setState({ articlesHtml });
  }

  render() {
    return <Wrapper>{this.state.articlesHtml}</Wrapper>;
  }
}
/* eslint-enable camelcase */
