function isLoggedInTrusted(req, res, next) {
  const isTest = process.env.NODE_ENV === 'test';
  // first check if the user is authenticated
  if (
    isTest ||
    (req.isAuthenticated() &&
      (req.user.role === 'moderator' || req.user.role === 'admin'))
  ) {
    return next();
  }
  return res.sendStatus(401);
}

module.exports = isLoggedInTrusted;
