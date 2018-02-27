const { Router } = require('express');

const auth = require('./auth');
const users = require('./users');

const router = new Router();

router.get('/api/v1/test', (req, res) => {
  res.json('wahoo');
});

router.post('/api/v1/register',
  users.register.validateRegister,
  users.register.register,
  auth.login
);
router.post('/api/v1/login', auth.login);
router.get('/api/v1/logout', auth.logout);

module.exports = router;
