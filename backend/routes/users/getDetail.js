// mongo id has an underscore
/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function getDetail(req, res) {
  const userId = req.params.id || req.user._id;
  const user = await User.findById(userId);
  const { _id, username, email, role, bio } = user;
  res.json({ _id, username, role, email, bio });
}

module.exports = getDetail;
