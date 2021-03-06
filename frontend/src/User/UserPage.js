import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material-UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import ListItemInput from '../ListItemInput';
import MessageBar from '../common/MessageBar';
import SaveButton from '../common/SaveButton';

import { Avatar, AvatarWrapper, Buttons, Label, Wrapper } from './styled';

import actions from './actions';
import roles from './roles';
import avatarPlaceholder from './avatar_placeholder.png';

import { SMALL_WINDOW } from '../config';

const propTypes = {
  isAdmin: PropTypes.bool,
  userId: PropTypes.string.isRequired,
};

const defaultProps = {
  isAdmin: true,
};

class UserPage extends React.Component {
  state = {
    user: {},
    isAdmin: this.props.isAdmin,
    message: {
      show: false,
      error: false,
      text: '',
    },
    horizontal: 'right',
    vertical: 'top',
  };

  componentDidMount = () => {
    actions
      .getUser(this.props.userId)
      .then(({ user }) => {
        this.setState(() => ({ user, initUser: { ...user } }));
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('getUser failed:', e));

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState(() => ({
      mobile: window.innerWidth <= SMALL_WINDOW,
    }));
  };

  handleSave = () => {
    const { user } = this.state;
    const message = { ...this.state.message, show: true };

    actions.saveUser(user).then(res => {
      if (res.success === false) {
        message.error = true;
        message.text = `Save failed: ${res.message.errors.name}`;
      } else {
        message.error = false;
        message.text = 'Saved Successfully';
      }
      this.setState(() => ({
        edited: false,
        initUser: { ...user },
        message,
      }));
    });
  };

  handleCancel = () => {
    this.setState(({ initUser }) => ({
      user: { ...initUser },
      edited: false,
    }));
  };

  handleChange = e => {
    const { user, initUser, message } = this.state;
    const { name, value } = e.target;
    user[name] = value;

    let edited;
    if (user[name] !== initUser[name]) {
      edited = true;
    }

    this.setState(() => ({
      user,
      edited,
      message: { ...message, show: false },
    }));
  };

  handleClose = () => {
    this.setState(() => ({
      message: { ...this.state.message, show: false },
    }));
  };

  render() {
    const {
      isAdmin,
      edited,
      user,
      mobile,
      message,
      horizontal,
      vertical,
    } = this.state;
    const { _id, avatar, role, username, email, bio } = user;

    return (
      <Wrapper>
        <Paper elevation={4}>
          <AvatarWrapper>
            <Avatar src={avatar || avatarPlaceholder} alt={username} />
          </AvatarWrapper>
          <List>
            <ListItemInput
              mobile={mobile}
              label="ID"
              name="id"
              value={_id || ''}
              disabled
            />
            <ListItemInput
              mobile={mobile}
              label="Username"
              name="username"
              value={username || ''}
              disabled
            />
            {isAdmin ? (
              <ListItem>
                <Label>Role:</Label>
                <ListItemText>
                  <Select
                    native
                    value={user.role}
                    inputRef={ref => {
                      this.select = ref;
                    }}
                    name="role"
                    onChange={this.handleChange}
                  >
                    {roles.map(r => <option key={r}>{r}</option>)}
                  </Select>
                </ListItemText>
              </ListItem>
            ) : (
              <ListItemInput
                mobile={mobile}
                label="Role"
                name="role"
                value={role || ''}
                disabled
              />
            )}
            <ListItemInput
              mobile={mobile}
              label="Email"
              name="email"
              value={email || ''}
              disabled
            />
            <ListItemInput
              mobile={mobile}
              label="Bio"
              name="bio"
              value={bio || ''}
              disabled={!isAdmin}
            />
          </List>
        </Paper>
        {isAdmin && (
          <Buttons>
            <SaveButton
              variant="raised"
              color="primary"
              disabled={!edited}
              onClick={this.handleSave}
            >
              Save
            </SaveButton>
          </Buttons>
        )}
        <MessageBar
          anchor={{ vertical, horizontal }}
          message={message}
          handleClose={this.handleClose}
        />
      </Wrapper>
    );
  }
}

UserPage.propTypes = propTypes;

UserPage.defaultProps = defaultProps;

export default withRouter(UserPage);
