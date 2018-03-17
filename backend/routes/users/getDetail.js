// mongo id has an underscore
/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function getDetail(req, res) {
  const userId = req.params.id || req.user._id;
  const user = await User.findById(userId);
  const { _id, username, email } = user;
  res.json({ success: true, _id, username, email });
}

module.exports = getDetail;
