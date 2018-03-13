// mongo id has an underscore
/* eslint-disable no-underscore-dangle */
const User = require('../../models/user');

async function getAll(req, res) {
  const users = await User.find({}, { email: 1, username: 1 });
  const list = users.map(user => ({
    _id: user._id,
    username: user.username,
    email: user.email
  }));
  res.json(list);
}

module.exports = getAll;
