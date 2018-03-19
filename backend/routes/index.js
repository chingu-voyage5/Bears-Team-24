const { Router } = require('express');

const auth = require('./auth');
const users = require('./users');

const passport = require('passport');

const router = new Router();

// FIXME: needs mocking correctly
if (process.env.NODE_ENV === 'test') {
  auth.isLoggedIn = (req, res, next) => next();
}

// TODO: remove example auth route
router.post('/api/v1/test',
  auth.isLoggedIn,
  (req, res) => {
    res.json({ success: true, data: 'waaaaahoo', test: req.body.test });
  }
);

router.get('/api/v1/user/:id*?', auth.isLoggedIn, users.getDetail);
router.get('/api/v1/users', auth.isLoggedIn, users.getAll);

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // req.user gets populated by passport
    res.redirect('http://127.0.0.1:3000');
  });

router.post('/api/v1/register',
  // users.register.validateRegister,
  users.register.register
);
router.post('/api/v1/login', auth.login);
router.post('/api/v1/logout', auth.logout);

module.exports = router;
