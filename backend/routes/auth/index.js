/* eslint-disable global-require */
module.exports = {
  login: require('./login'),
  logout: require('./logout'),
  isLoggedIn: require('./isLoggedIn'),
  isLoggedInAdmin: require('./isLoggedInAdmin'),
  isLoggedInTrusted: require('./isLoggedInTrusted'),
};
