import React from 'react';
import Input from './Input';
import { ButtonLikeText, Fields, Form, Heading2, Wrapper } from './styled';
import actions from './actions';

const MIN_PASSWORD_LENGTH = 1;
const MIN_USERNAME_LENGTH = 1;

class Login extends React.Component {
  state = {
    register: false,
    username: '',
    password1: '',
    password2: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    /* eslint-disable no-console */
    if (this.state.register) {
      const { username, password1, password2 } = this.state;
      console.log('register:', this.state);
      actions.register({ username, password1, password2 })
        .then(json => {
          console.log('register response:', json);
        });
    } else {
      const { username, password1 } = this.state;
      console.log('login:', this.state);
      actions.login({ username, password: password1 })
        .then(json => {
          console.log('login response:', json);
        });
    }
    /* eslint-enable */

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
    }));
  };

  render() {
    const { password1, password2, register, username } = this.state;

    const isSubmitDisabled =
      password1.length < MIN_PASSWORD_LENGTH ||
      username.length < MIN_USERNAME_LENGTH ||
      (register && password1 !== password2);

    const loginGithubUrl = process.env.NODE_ENV === 'production'
      ? '/auth/github'
      : 'http://127.0.0.1:3001/auth/github';

    return (
      <Wrapper>
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
        <a href={loginGithubUrl} >
          Login using GitHub
        </a>
      </Wrapper>
    );
  }
}

export default Login;
