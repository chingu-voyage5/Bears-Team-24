/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const passport = require('passport');

function login(req, res, next) {
  passport.authenticate('local', function check(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, function cb(e) {
      if (e) {
        return next(e);
      }
      const { _id, name, email, avatar } = user;
      res.send({ _id, name, email, avatar });
    });
  })(req, res, next);
}

module.exports = login;
