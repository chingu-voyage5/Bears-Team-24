// mongo id has an underscore
/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function getDetail(req, res) {
  let userId;
  if (req.params.id) {
    userId = req.params.id;
  } else if (req.user && req.user._id) {
    userId = req.user._id;
  }
  if (userId) {
    const user = await User.findById(userId);
    const { _id, username, role, email, bio, avatar } = user;
    res.json({
      success: true,
      user: { _id, username, role, email, bio, avatar },
    });
  } else {
    res.json({ success: false });
  }
}

module.exports = getDetail;
