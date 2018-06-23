/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function update(req, res) {
  const user = await User.findById(req.body._id);
  const { name, email, role, bio } = req.body;
  user.name = name;
  user.email = email;
  user.role = role;
  user.bio = bio;

  try {
    await user.save();
  } catch (e) {
    return res.json({ success: false, message: e });
  }
  return res.json({ success: true, user });
}

module.exports = update;
