const promisify = require('es6-promisify');
const User = require('../../models/user');

exports.validateRegister = (req, res, next) => {
  // Below methods are added to req object by express-validator module
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a name!').notEmpty();
  if (process.env.NODE_ENV === 'development') {
    req.sanitizeBody('email');
  } else {
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
      gmail_remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
  }
  req.checkBody('password1', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password2', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password2', 'Oops! Your passwords do not match').equals(req.body.password1);

  const errors = req.validationErrors();
  if (errors) {
    // stop the fn from running
    return res.status(400).json({
      errors: errors.map(err => err.msg)
    });
  }
  return next();
};

exports.register = async (req, res, next) => {
  const { username } = req.body;
  const user = new User({ username }); // { email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  try {
    await register(user, req.body.password1);
  } catch (e) {
    return res.json({ error: e.name });
  }
  // eslint-disable-next-line no-underscore-dangle
  res.json({ _id: user._id, username: user.username });
  return next();
};
