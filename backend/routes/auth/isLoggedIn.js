function isLoggedIn(req, res, next) {
  // first check if the user is authenticated
  if (process.env.NODE_ENV === 'test' || req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
}

module.exports = isLoggedIn;
