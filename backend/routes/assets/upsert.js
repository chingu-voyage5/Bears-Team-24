const fs = require('fs');
const Asset = require('../../models/asset');
const User = require('../../models/user');

const upsert = async (req, res) => {
  let asset;
  let user;
  if (req.body._id) {
    asset = await Asset.findById(req.body._id).populate('creator');
    user = asset.creator;
  } else {
    user = await User.findById(req.user._id);
    asset = new Asset();
    asset.creator = req.user._id;
  }
  asset.title = req.body.title;
  asset.description = req.body.description;
  if (req.file) {
    const fd = req.file;
    const data = fs.readFileSync(fd.path);
    asset.content_type = fd.mimetype;
    asset.content = data;
    fs.unlinkSync(fd.path);
  }
  await asset.save();
  res.json({
    success: true,
    _id: asset._id,
    creator: { _id: user._id, username: user.username },
  });
};

module.exports = upsert;
