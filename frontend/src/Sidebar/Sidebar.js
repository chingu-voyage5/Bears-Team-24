import React from 'react';
import PropTypes from 'prop-types';
import { getTree, getChildren } from './utils';

import { Wrapper } from './styled';

export default class Sidebar extends React.Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    match: PropTypes.object,
  };

  static defaultProps = {
    match: '',
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
      const match = articles.filter(article => article._id === id);
      if (match.length) {
        // eslint-disable-next-line camelcase
        const { topic, sub_topic, title } = match[0];
        selectedArticlePath = [topic, title].concat(sub_topic.split('>'));
      }
    }
    const tree = getTree(articles);
    const articlesHtml = getChildren(tree, selectedArticlePath);
    this.setState({ articlesHtml });
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.articles.length === this.props.articles.length) {
      return false;
    }
    return true;
  }

  render() {
    return <Wrapper>{this.state.articlesHtml}</Wrapper>;
  }
}
