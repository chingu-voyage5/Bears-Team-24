const { Router } = require('express');
const multer = require('multer');

const upload = multer({ dest: process.env.IMAGE_UPLOAD_DIR});

const auth = require('./auth');
const users = require('./users');
const assets = require('./assets');

const router = new Router();

router.get('/api/v1/test', (req, res) => {
  res.json('wahoo');
});

router.get('/api/v1/user/:id*?', users.getDetail);
router.get('/api/v1/users', users.getAll);

router.get('/api/v1/assets', assets.getAll);
router.get('/api/v1/asset/:id', assets.getDetail);
router.post('/api/v1/asset', upload.single('blob'), assets.upsert);

router.post('/api/v1/register',
  // users.register.validateRegister,
  users.register.register
);
router.post('/api/v1/login', auth.login);
router.get('/api/v1/logout', auth.logout);

module.exports = router;
