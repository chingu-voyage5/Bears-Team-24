const promisify = require('es6-promisify');
const User = require('../../models/user');

exports.validateRegister = (req, res, next) => {
  // Below methods are added to req object by express-validator module
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a name!').notEmpty();
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
  return next(); // there were no errors!
};

exports.register = async (req, res) => {
  const { username, password1 } = req.body;
  const user = new User({ username });
  const register = promisify(User.register, User);
  try {
    await register(user, password1);
  } catch (e) {
    return res.json({ error: e.name });
  }
  return res.json(user);
};
