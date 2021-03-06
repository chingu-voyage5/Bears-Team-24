import React from 'react';
import PropTypes from 'prop-types';

// Material UI components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  isAdmin: PropTypes.bool.isRequired,
  isTrusted: PropTypes.bool.isRequired,
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
    } else {
      const { pathname } = nextProps.location;
      const stem = pathname.split('/')[1];

      this.handleIndicator(null, paths.findIndex(path => path.stem === stem));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getLocationLabel = location => {
    const HOME = 'Home';

    if (!location) return HOME;

    return location.pathname.split('/')[1] || HOME;
  };

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
    const {
      classes,
      isLoggedIn,
      isAdmin,
      isTrusted,
      location,
      username,
    } = this.props;

    return (
      <Wrapper>
        <AppBar position="static">
          <Toolbar disableGutters>
            {mobile ? (
              <React.Fragment>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.openDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <Typography color="inherit" variant="button">
                  {this.getLocationLabel(location)}
                </Typography>
              </React.Fragment>
            ) : (
              <Tabs
                classes={{ root: classes.fullHeight }}
                value={value < 0 ? 0 : value}
                onChange={this.handleIndicator}
                indicatorColor="secondary"
                fullWidth={false}
              >
                <TabMod value={0} exact classes={classes} />
                {isLoggedIn && <TabMod value={1} classes={classes} />}
                {isAdmin && <TabMod value={2} classes={classes} />}
                {isLoggedIn && <TabMod value={3} classes={classes} />}
                {isLoggedIn && <TabMod value={4} classes={classes} />}
                {isTrusted && <TabMod value={5} classes={classes} />}
                <TabMod value={6} classes={classes} />
              </Tabs>
            )}
            <Greeting>Hi,&nbsp;{username}</Greeting>
            {isLoggedIn ? (
              <NavLinkStyled to="/logout" onClick={this.hideIndicator}>
                <Typography variant="button" color="inherit">
                  Logout
                </Typography>
              </NavLinkStyled>
            ) : (
              <NavLinkStyled to="/login" onClick={this.hideIndicator}>
                <Typography variant="button" color="inherit">
                  Login
                </Typography>
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
                {paths.map((path, i) => {
                  if (i > 0 && i < paths.length - 1 && !isLoggedIn) {
                    return null;
                  }
                  if ((i === 2 && !isAdmin) || (i === 5 && !isTrusted)) {
                    return null;
                  }
                  return (
                    <ListItem
                      exact
                      key={path.stem}
                      component={DrawerLink}
                      to={paths[i].to}
                      divider
                    >
                      {path.label}
                    </ListItem>
                  );
                })}
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
