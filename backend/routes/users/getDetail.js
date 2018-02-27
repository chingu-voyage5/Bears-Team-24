// mongo id has an underscore
/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function getDetail(req, res) {
  const userId = req.params.id || req.user._id;
  const user = await User.findById(userId);
  res.json({
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    email: user.email
  });
}

module.exports = getDetail;
