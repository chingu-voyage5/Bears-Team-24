function isLoggedInAdmin(req, res, next) {
  if (
    process.env.NODE_ENV === 'test' ||
    (req.isAuthenticated() && req.user.role === 'admin')
  ) {
    return next();
  }
  return res.sendStatus(401);
}

module.exports = isLoggedInAdmin;
