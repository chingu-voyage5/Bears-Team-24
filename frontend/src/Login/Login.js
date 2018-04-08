import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Input from './Input';
import {
  ButtonLikeText,
  Fields,
  Form,
  Heading2,
  Wrapper,
  Message,
} from './styled';
import actions from './actions';

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
        // eslint-disable-next-line no-console
        .catch(err => console.error('register failed:', err));
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
        // eslint-disable-next-line no-console
        .catch(err => console.error('login failed:', err));
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
        <Message show={message.show} error={message.error}>
          {message.text}
        </Message>
        <Form onSubmit={this.handleSubmit}>
          <Heading2>{!register ? 'Login' : 'Register'}</Heading2>
          <Fields>
            <Input
              label={
                register
                  ? `Username (min ${MIN_USERNAME_LENGTH} characters):`
                  : 'Username:'
              }
              name="username"
              onChange={this.handleChange}
              value={username}
              autofocus
            />
            <Input
              label={
                register
                  ? `Password (min ${MIN_PASSWORD_LENGTH} characters):`
                  : 'Password:'
              }
              name="password1"
              type="password"
              onChange={this.handleChange}
              value={password1}
            />
            {register && (
              <Input
                label="Repeat password:"
                name="password2"
                type="password"
                onChange={this.handleChange}
                value={password2}
              />
            )}
          </Fields>
          <Input
            disabled={isSubmitDisabled}
            name="submit"
            type="submit"
            onChange={this.handleChange}
            value={register ? 'Register' : 'Login'}
          />
        </Form>
        <ButtonLikeText onClick={this.switchToRegister}>
          {!register
            ? 'Click to register new user'
            : 'Click to login as an existing user'}
        </ButtonLikeText>
        <a href={loginGithubUrl}>Login using GitHub</a>
      </Wrapper>
    );
  }
}

export default Login;
