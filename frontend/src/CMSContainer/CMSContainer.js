import React from 'react';
import { Route } from 'react-router-dom';

// Material UI components
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { getArticleList } from './actions';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

const BREAK_MOBILE = 900;

export default class CMSContainer extends React.Component {
  state = {
    articleList: [],
  };

  componentDidMount = () => {
    getArticleList().then(articleList => {
      this.setState({ articleList });
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { mobile } = this.state;
    const windowWidth = window.innerWidth;

    if (mobile && windowWidth > BREAK_MOBILE) {
      this.setState(() => ({
        mobile: false,
      }));
    } else if (!mobile && windowWidth <= BREAK_MOBILE) {
      this.setState(() => ({
        mobile: true,
      }));
    }
  };

  openDrawer = () => {
    this.setState(() => ({
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
        style={{ width: 250 }}
        tabIndex={0}
        role="button"
        onClick={this.closeDrawer}
        onKeyDown={this.closeDrawer}
      >
        {component}
      </div>
    </Drawer>
  );

  render() {
    const { articleList, mobile, open } = this.state;

    return (
      <Wrapper>
        {mobile && (
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={this.openDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Route
          path="/cms/:id?"
          render={p =>
            mobile ? (
              this.renderDrawer(<Sidebar {...p} articles={articleList} />, open)
            ) : (
              <Sidebar {...p} articles={articleList} />
            )
          }
        />
        <Route
          exact
          path="/cms"
          render={() => (
            <div>
              <h1>Welcome</h1>
            </div>
          )}
        />
        <Route path="/cms/:id" component={ContentArea} />
      </Wrapper>
    );
  }
}
