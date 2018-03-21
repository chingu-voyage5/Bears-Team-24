const { Router } = require('express');

const auth = require('./auth');
const users = require('./users');

const router = new Router();

router.get('/api/v1/test', (req, res) => {
  res.json('wahoo');
});

router.get('/api/v1/user/:id*?', users.getDetail);
router.get('/api/v1/users', users.getAll);

router.post(
  '/api/v1/register',
  users.register.validateRegister,
  users.register.register
);
router.post('/api/v1/login', auth.login);
router.get('/api/v1/logout', auth.logout);

module.exports = router;
