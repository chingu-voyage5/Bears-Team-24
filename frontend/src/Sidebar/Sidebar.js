import React from 'react';
import PropTypes from 'prop-types';

// Material UI components
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import expandTree from './expandTree';
import buildHtml, { getTree } from './utils';

import { Wrapper } from './styled';

const BREAK_MOBILE = 900;

export default class Sidebar extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    articles: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };

  state = {
    open: false,
    articlesHtml: [],
    mobile: false,
  };

  componentDidMount() {
    const mobile = this.checkMobile();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mobile });
    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.articlesHtml.length === 0 && nextProps.articles.length) {
      const { articles } = nextProps;
      const articleTree = getTree(articles);
      const { match } = this.props;
      const { mobile } = this.state;
      const selFn = mobile ? this.closeDrawer : this.nop;
      const articlesHtml = buildHtml(
        articles,
        articleTree,
        match.params.id,
        selFn,
        this.onExpanded
      );
      this.setState({ articleTree, articlesHtml });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onExpanded = (_id, expanded) => {
    const articleTree = expandTree(this.state.articleTree, _id, expanded);
    this.setState({ articleTree });
  };

  nop = e => {
    e.stopPropagation();
  };

  handleResize = () => {
    const mobile = this.checkMobile();
    this.setState({ mobile });
  };

  checkMobile = () => {
    let { mobile } = this.state;
    const windowWidth = window.innerWidth;

    if (mobile && windowWidth > BREAK_MOBILE) {
      mobile = false;
    } else if (!mobile && windowWidth <= BREAK_MOBILE) {
      mobile = true;
    }
    return mobile;
  };

  openDrawer = () => {
    const { articles, match } = this.props;
    const { articleTree } = this.state;
    const articlesHtml = buildHtml(
      articles,
      articleTree,
      match.params.id,
      this.closeDrawer,
      this.onExpanded
    );
    this.setState(() => ({
      articlesHtml,
      open: true,
    }));
  };

  closeDrawer = () => {
    this.setState(() => ({
      open: false,
    }));
  };

  renderDrawer = (component, open) => (
    <Drawer open={open} onClose={this.closeDrawer}>
      <div
        style={{ paddingTop: '1rem', width: 250 }}
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
    return (
      <div>
        {mobile && (
          <IconButton
            colors="inherit"
            aria-label="Menu"
            onClick={this.openDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        {mobile ? (
          this.renderDrawer(articlesHtml, open)
        ) : (
          <Wrapper>{articlesHtml}</Wrapper>
        )}
      </div>
    );
  }
}
