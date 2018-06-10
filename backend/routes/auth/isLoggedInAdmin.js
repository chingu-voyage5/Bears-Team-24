function isLoggedInAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      return next();
    }
  }
  return res.sendStatus(401);
}

module.exports = isLoggedInAdmin;
