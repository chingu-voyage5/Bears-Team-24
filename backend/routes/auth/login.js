/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-shadow */

const passport = require('passport');

function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      const { _id, username, role } = user;
      res.send({ _id, username, role });
    });
  })(req, res, next);
}

module.exports = login;
