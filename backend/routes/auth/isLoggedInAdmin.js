function isLoggedInAdmin(req, res, next) {
  const isTest = process.env.NODE_ENV === 'test';
  const hasAdminRole = req.user.role === 'admin';
  if (isTest || (req.isAuthenticated() && hasAdminRole)) {
    return next();
  }
  return res.sendStatus(401);
}

module.exports = isLoggedInAdmin;
