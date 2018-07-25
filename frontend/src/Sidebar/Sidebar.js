import React from 'react';
import PropTypes from 'prop-types';

// Material UI components
import Drawer from '@material-ui/core/Drawer';

import expandTree from './expandTree';
import buildHtml, { getTree, checkMobile } from './utils';

import { Dummy, Wrapper } from './styled';

export default class Sidebar extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    articles: PropTypes.array.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    isDrawerOpen: PropTypes.bool,
    match: PropTypes.object.isRequired,
    windowWidth: PropTypes.number.isRequired,
  };

  static defaultProps = {
    isDrawerOpen: false,
    onClick: e => e.stopPropagation(),
  };

  state = {
    open: false,
    articlesHtml: [],
    mobile: false,
  };

  componentDidMount() {
    const mobile = checkMobile(false, this.props.windowWidth);
    this.setState({ mobile });
  }

  componentWillReceiveProps(nextProps) {
    const idHasChanged =
      this.props.match.params.id !== nextProps.match.params.id;

    if (
      (this.state.articlesHtml.length === 0 && nextProps.articles.length) ||
      idHasChanged
    ) {
      const { articles } = nextProps;
      const articleTree = getTree(articles);
      const { match } = this.props;
      const { mobile } = this.state;
      const selFn = mobile ? this.closeDrawer : this.props.onClick;
      const articlesHtml = buildHtml({
        articles,
        articleTree,
        id: idHasChanged ? nextProps.match.params.id : match.params.id,
        onArticleSelect: selFn,
        onExpand: this.onExpanded,
      });
      this.setState({ articleTree, articlesHtml });
    }
  }

  componentDidUpdate(prevProps) {
    const widthHasChanged = this.props.windowWidth !== prevProps.windowWidth;
    const isDrawerToggled = this.props.isDrawerOpen !== prevProps.isDrawerOpen;

    if (widthHasChanged) {
      const mobile = checkMobile(this.state.mobile, this.props.windowWidth);
      this.setState(() => ({ mobile }));
    }

    if (isDrawerToggled) {
      if (this.props.isDrawerOpen) {
        this.openDrawer();
      } else {
        this.closeDrawer();
      }
    }
  }

  onExpanded = (_id, expanded) => {
    const articleTree = expandTree(this.state.articleTree, _id, expanded);
    this.setState({ articleTree });
  };

  openDrawer = () => {
    const { articles, match } = this.props;
    const { articleTree } = this.state;
    const articlesHtml = buildHtml({
      articles,
      articleTree,
      id: match.params.id,
      onArticleSelect: this.closeDrawer,
      onExpand: this.onExpanded,
    });
    this.setState(() => ({
      articlesHtml,
      open: true,
    }));
  };

  closeDrawer = () => {
    this.setState(
      () => ({
        open: false,
      }),
      this.props.handleDrawerClose
    );
  };

  renderDrawer = (component, open) => (
    <Drawer open={open} onClose={this.closeDrawer}>
      <Dummy
        tabIndex={0}
        role="button"
        onClick={this.closeDrawer}
        onKeyDown={this.closeDrawer}
      />
      {component}
    </Drawer>
  );

  render() {
    const { articlesHtml, mobile, open } = this.state;
    const { onClick } = this.props;

    return (
      // eslint-disable-next-line
      <div onClick={onClick}>
        {mobile ? (
          this.renderDrawer(articlesHtml, open)
        ) : (
          <Wrapper data-testid="sidebar">{articlesHtml}</Wrapper>
        )}
      </div>
    );
  }
}
