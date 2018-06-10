const { Router } = require('express');
const multer = require('multer');

const upload = multer({ dest: process.env.IMAGE_UPLOAD_DIR });

const auth = require('./auth');
const users = require('./users');
const assets = require('./assets');
const cms = require('./cms');
const articles = require('./articles');
const topics = require('./topics');

const passport = require('passport');

const router = new Router();

function catchAsyncErrors(middleware) {
  return (req, res, next) =>
    Promise.resolve(middleware(req, res, next)).catch(next);
}

router.get(
  '/api/v0/articleChangeRequestList',
  // auth.isLoggedIn,
  catchAsyncErrors(articles.getAllChangeRequests)
);

router.get(
  '/api/v0/articleChangeRequest',
  // auth.isLoggedIn,
  catchAsyncErrors(articles.getChangeRequest)
);

router.post(
  '/api/v0/articleChangeRequest',
  // auth.isLoggedIn,
  catchAsyncErrors(articles.processChangeRequest)
);

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
    const redir =
      process.env.NODE_ENV === 'production' ? '/' : 'http://127.0.0.1:3000';
    res.redirect(redir);
  }
);

router.get(
  '/api/v1/topics',
  auth.isLoggedIn,
  catchAsyncErrors(topics.getTopics)
);
router.post(
  '/api/v1/topics/new',
  auth.isLoggedIn,
  catchAsyncErrors(topics.createTopic)
);
router.post(
  '/api/v1/topics',
  auth.isLoggedIn,
  catchAsyncErrors(topics.upsertTopics)
);

router.get(
  '/api/v1/subtopics',
  auth.isLoggedIn,
  catchAsyncErrors(topics.getSubTopics)
);
router.post(
  '/api/v1/subtopics',
  auth.isLoggedIn,
  catchAsyncErrors(topics.upsertSubTopics)
);

router.get('/api/v0/articles', catchAsyncErrors(articles.getAll));
router.get('/api/v0/articles/:id', articles.getDetail);
router.post(
  '/api/v0/articles/:id*?',
  auth.isLoggedIn,
  catchAsyncErrors(articles.upsert)
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

router.get('/api/v1/articles', catchAsyncErrors(articles.getAll));
router.get('/api/v1/articles/:id*?', cms.getArticleJSON);

router.post(
  '/api/v1/register',
  // users.register.validateRegister,
  users.register.register
);
router.post('/api/v1/login', auth.login);
router.post('/api/v1/logout', auth.logout);

module.exports = router;
