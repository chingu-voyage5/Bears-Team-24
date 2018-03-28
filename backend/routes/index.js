const { Router } = require('express');
const multer = require('multer');

const upload = multer({ dest: process.env.IMAGE_UPLOAD_DIR });

const auth = require('./auth');
const users = require('./users');
const assets = require('./assets');

const passport = require('passport');

const router = new Router();

function catchAsyncErrors(middleware) {
  return (req, res, next) =>
    Promise.resolve(middleware(req, res, next)).catch(next);
}

router.get(
  '/api/v1/user/:id*?',
  auth.isLoggedIn,
  catchAsyncErrors(users.getDetail)
);
router.get('/api/v1/users', auth.isLoggedIn, catchAsyncErrors(users.getAll));

router.get('/auth/github', passport.authenticate('github'));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // req.user gets populated by passport
    res.redirect('http://127.0.0.1:3000');
  }
);

router.get('/api/v1/assets', auth.isLoggedIn, catchAsyncErrors(assets.getAll));
router.get('/api/v1/asset/:id', catchAsyncErrors(assets.getDetail));
router.get('/api/v1/asset/content/:id', catchAsyncErrors(assets.getContent));
router.post(
  '/api/v1/asset',
  auth.isLoggedIn,
  upload.single('blob'),
  catchAsyncErrors(assets.upsert)
);

router.post(
  '/api/v1/register',
  // users.register.validateRegister,
  users.register.register
);
router.post('/api/v1/login', auth.login);
router.post('/api/v1/logout', auth.logout);

module.exports = router;
