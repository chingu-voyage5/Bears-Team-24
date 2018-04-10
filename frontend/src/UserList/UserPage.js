import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material-UI components
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';

import { Avatar, AvatarWrapper, Buttons, Label, Wrapper } from './styled';

import actions from './actions';
import roles from './roles';
import avatarPlaceholder from './avatar_placeholder.png';

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
  };

  componentDidMount = () => {
    actions
      .getUser(this.props.userId)
      .then(({ user }) => {
        this.setState(() => ({ user, initUser: { ...user } }));
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('getUser failed:', e));
  };

  handleSave = () => {
    const { user } = this.state;
    // eslint-disable-next-line
    alert(`Saving edited user ${user.username}`);

    this.setState(() => ({
      edited: false,
      initUser: { ...user },
    }));
  };

  handleCancel = () => {
    this.setState(({ initUser }) => ({
      user: { ...initUser },
      edited: false,
    }));
  };

  handleChange = e => {
    const { user, initUser } = this.state;
    const { name, value } = e.target;
    user[name] = value;

    let edited;
    if (user[name] !== initUser[name]) {
      edited = true;
    }

    this.setState(() => ({
      user,
      edited,
    }));
  };

  render() {
    const { isAdmin, edited, user } = this.state;
    const { _id, avatar, role, username, email, bio } = user;

    return (
      <Wrapper>
        <Paper elevation={4}>
          <AvatarWrapper>
            <Avatar src={avatar || avatarPlaceholder} alt={username} />
          </AvatarWrapper>
          <List>
            <ListItem />
            <ListItem>
              <Label>Id:</Label>
              <ListItemText primary={_id} />
            </ListItem>
            <ListItem>
              <Label>Username:</Label>
              <ListItemText primary={username} />
            </ListItem>
            <ListItem>
              <Label>Role:</Label>
              {isAdmin ? (
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
              ) : (
                <ListItemText primary={role} />
              )}
            </ListItem>
            <ListItem>
              <Label>Email:</Label>
              <ListItemText primary={email} />
            </ListItem>
            <ListItem>
              <Label>Bio:</Label>
              {isAdmin ? (
                <ListItemText>
                  <TextField
                    value={bio}
                    multiline
                    fullWidth
                    onChange={this.handleChange}
                    name="bio"
                  />
                </ListItemText>
              ) : (
                <ListItemText primary={bio} />
              )}
            </ListItem>
          </List>
        </Paper>
        {isAdmin && (
          <Buttons>
            <Button
              variant="raised"
              color="primary"
              disabled={!edited}
              onClick={this.handleSave}
            >
              Save
            </Button>
            <Button
              variant="flat"
              color="default"
              disabled={!edited}
              onClick={this.handleCancel}
            >
              Discard
            </Button>
          </Buttons>
        )}
      </Wrapper>
    );
  }
}

UserPage.propTypes = propTypes;

UserPage.defaultProps = defaultProps;

export default withRouter(UserPage);
