import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem } from 'material-ui/List';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TabMod from './TabMod';

import { DrawerLink, Greeting, NavLinkStyled, Wrapper } from './styled';

import paths from './config';

const propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

const defaultProps = {
  history: { location: { pathname: '' } },
};

// https://stackoverflow.com/a/48934864/6696407
const styles = theme => ({
  fullHeight: {
    ...theme.mixins.toolbar,
  },
});

const BREAK_MOBILE = 700;

class Navbar extends React.Component {
  state = {
    value: 0,
    mobile: window.innerWidth <= BREAK_MOBILE,
  };

  componentDidMount() {
    const initialPath = this.props.history.location.pathname.split('/')[1];
    const idx = paths.findIndex(p => p.stem === initialPath);
    // eslint-disable-next-line
    this.setState(() => ({
      value: idx < 0 ? false : idx,
    }));

    window.addEventListener('resize', this.handleResize);
  }
  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line
    if (nextProps.location.pathname === '/') {
      this.handleIndicator(null, 0);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = e => {
    const { mobile } = this.state;
    const windowWidth = e.target.innerWidth;

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

  handleIndicator = (e, value) => {
    this.setState(() => ({
      value,
    }));
  };

  hideIndicator = () => {
    this.setState(() => ({
      value: false,
    }));
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

  render() {
    const { mobile, open, value } = this.state;
    const { classes, isLoggedIn, username } = this.props;

    return (
      <Wrapper>
        <AppBar position="static">
          <Toolbar disableGutters>
            {mobile ? (
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.openDrawer}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Tabs
                classes={{ root: classes.fullHeight }}
                value={value}
                onChange={this.handleIndicator}
                indicatorColor="secondary"
                fullWidth={false}
              >
                <TabMod idx={0} exact classes={classes} />
                {isLoggedIn && <TabMod idx={1} classes={classes} />}
                {isLoggedIn && <TabMod idx={2} classes={classes} />}
                {isLoggedIn && <TabMod idx={3} classes={classes} />}
                <TabMod idx={4} classes={classes} />
              </Tabs>
            )}
            <Greeting>Hi,&nbsp;{username}</Greeting>
            {isLoggedIn ? (
              <NavLinkStyled to="/logout" onClick={this.hideIndicator}>
                <Typography variant="button">Logout</Typography>
              </NavLinkStyled>
            ) : (
              <NavLinkStyled to="/login" onClick={this.hideIndicator}>
                <Typography variant="button">Login</Typography>
              </NavLinkStyled>
            )}
          </Toolbar>
          <Drawer open={open} onClose={this.closeDrawer}>
            <div
              style={{ width: 250 }}
              tabIndex={0}
              role="button"
              onClick={this.closeDrawer}
              onKeyDown={this.closeDrawer}
            >
              <List>
                {paths.map((path, i) => (
                  <ListItem
                    exact
                    key={path.stem}
                    component={DrawerLink}
                    to={paths[i].to}
                    divider
                  >
                    {path.label}
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </AppBar>
      </Wrapper>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default withStyles(styles)(Navbar);
