/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function update(req, res) {
  const user = await User.findById(req.user._id);
  const { name, email } = req.body;
  user.name = name;
  user.email = email;

  try {
    await user.save();
  } catch (e) {
    res.json({ success: false, message: e });
    return;
  }
  res.json({ success: true, user });
}

module.exports = update;
