const { Router } = require('express');

const auth = require('./auth');
const users = require('./users');

const passport = require('passport');

const router = new Router();

router.post('/api/v1/test',
  auth.isLoggedIn,
  (req, res) => {
    res.json('wahoo');
  });

router.get('/api/v1/user/:id*?', users.getDetail);
router.get('/api/v1/users', users.getAll);

router.get('/auth/github',
  (req, res, next) => {
    console.log('github auth');
    return next();
  },
  passport.authenticate('github') // , { scope: ['user:email'] }));
);

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  // eslint-disable-next-line func-names, prefer-arrow-callback
  function (req, res) {
    // Successful authentication, redirect home.
    res.send({ success: true });
  });

router.post('/api/v1/register',
  // users.register.validateRegister,
  users.register.register
);
router.post('/api/v1/login', auth.login);
router.post('/api/v1/logout', auth.logout);

module.exports = router;
