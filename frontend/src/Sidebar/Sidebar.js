import React from 'react';
import PropTypes from 'prop-types';
import { getTree, getChildren } from './utils';

import { Wrapper } from './styled';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const self = this;
    (function linterAvoid() {
      const tree = getTree(self.props.articles);
      const tre = getChildren(tree);
      self.setState({ articlesHtml: tre });
    })();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.articles.length !== nextProps.articles.length ||
      (!this.state.articlesHtml && nextState.articlesHtml) ||
      (this.state.articlesHtml.length === 0 &&
        nextState.articlesHtml.length > 0)
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const self = this;
    (function linterAvoid() {
      const tree = getTree(self.props.articles);
      const tre = getChildren(tree);
      self.setState({ articlesHtml: tre });
    })();
  }

  render() {
    return (
      <Wrapper>
        {this.state.articlesHtml && this.state.articlesHtml.length > 0
          ? this.state.articlesHtml
          : 'wait'}
      </Wrapper>
    );
  }
}

export default Sidebar;

Sidebar.propTypes = {
  articles: PropTypes.array,
};

Sidebar.defaultProps = {
  articles: [],
};
