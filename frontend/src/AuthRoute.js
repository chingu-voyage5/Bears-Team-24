import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.object,
  redirect: PropTypes.string,
  render: PropTypes.func,
};

const defaultProps = {
  component: null,
  redirect: '/login',
  render: null,
};

const AuthRoute = ({
  isLoggedIn,
  component: Component,
  redirect,
  render: renderer,
  ...rest
}) => {
  if (renderer && isLoggedIn) {
    return <Route {...rest} render={renderer} />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: redirect }} />
        )
      }
    />
  );
};

AuthRoute.propTypes = propTypes;
AuthRoute.defaultProps = defaultProps;

export default AuthRoute;
