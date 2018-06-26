import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// Material-UI components
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import MessageBar from '../common/MessageBar';

import {
  Fields,
  Form,
  GithubButton,
  Heading2,
  Register,
  Spacer,
  Wrapper,
} from './styled';

import actions from './actions';

const githubIcon = <FontAwesomeIcon icon={faGithub} />;

const MIN_PASSWORD_LENGTH = process.env.NODE_ENV === 'development' ? 1 : 6;
const MIN_USERNAME_LENGTH = process.env.NODE_ENV === 'development' ? 1 : 6;

class Login extends React.Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  state = {
    register: false,
    username: '',
    password1: '',
    password2: '',
    redirect: false,
    message: { show: false, error: false, text: '' },
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
      message: { ...this.state.message, show: false },
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.register) {
      const { username, password1, password2 } = this.state;
      actions
        .register({ username, password1, password2 })
        .then(json => {
          if (json.error) {
            this.setState({
              message: { show: true, error: true, text: json.error },
            });
          } else {
            this.setState({
              register: false,
              message: {
                show: true,
                error: false,
                text: 'Successfully Registered',
              },
            });
          }
        })
        .catch(() => {
          this.setState(() => ({
            message: {
              show: true,
              error: true,
            },
          }));
        });
    } else {
      const { username, password1 } = this.state;

      actions
        .login({ username, password: password1 })
        .then(json => {
          if (json.error) {
            this.setState({
              message: {
                show: true,
                error: true,
                text: json.error,
              },
            });
            this.props.setUser(null);
          } else {
            this.props.setUser(json);
            this.setState({ redirect: '/' });
          }
        })
        .catch(() => {
          this.setState(() => ({
            message: {
              show: true,
              error: true,
              text: 'Login failed',
            },
          }));
        });
    }

    this.setState(() => ({
      username: '',
      password1: '',
      password2: '',
    }));
  };

  switchToRegister = () => {
    this.setState(({ register }) => ({
      register: !register,
      username: '',
      password1: '',
      password2: '',
      message: { ...this.state.message, show: false },
    }));
  };

  handleMouseDownPassword = e => {
    e.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClose = () => {
    this.setState(() => ({
      message: { ...this.state.message, show: false },
    }));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { password1, password2, register, username, message } = this.state;

    const isSubmitDisabled =
      password1.length < MIN_PASSWORD_LENGTH ||
      username.length < MIN_USERNAME_LENGTH ||
      (register && password1 !== password2);

    const loginGithubUrl =
      process.env.NODE_ENV === 'production'
        ? '/auth/github'
        : 'http://127.0.0.1:3001/auth/github';

    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Heading2>{!register ? 'Login' : 'Register'}</Heading2>
          <Fields>
            <TextField
              id="username"
              label={
                register
                  ? `Username (min ${MIN_USERNAME_LENGTH} characters):`
                  : 'Username:'
              }
              name="username"
              value={username}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              autoFocus
            />
            <FormControl margin="normal">
              <InputLabel htmlFor="password1">
                {register
                  ? `Password (min ${MIN_PASSWORD_LENGTH} characters):`
                  : 'Password:'}
              </InputLabel>
              <Input
                id="password1"
                name="password1"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password1}
                onChange={this.handleChange}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {register && (
              <TextField
                id="password2"
                label="Repeat password:"
                name="password2"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password2}
                onChange={this.handleChange}
                fullWidth
                margin="normal"
              />
            )}
          </Fields>
          <Button
            variant="raised"
            color="primary"
            name="submit"
            type="submit"
            disabled={isSubmitDisabled}
            onChange={this.handleChange}
          >
            {register ? 'Register' : 'Login'}
          </Button>
        </Form>
        <Spacer />
        <GithubButton href={loginGithubUrl}>
          {githubIcon}&nbsp;&nbsp;GitHub Login
        </GithubButton>
        <Spacer />
        <Register variant="body2" onClick={this.switchToRegister}>
          {!register
            ? 'Click to register new user'
            : 'Click to login as an existing user'}
        </Register>
        <MessageBar
          anchor={{ vertical: 'top', horizontal: 'center' }}
          message={message}
          handleClose={this.handleClose}
        />
      </Wrapper>
    );
  }
}

export default Login;
