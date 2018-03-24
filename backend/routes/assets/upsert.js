const fs = require('fs');
const Asset = require('../../models/asset');

const upsert = async (req, res) => {
  let asset;
  if (req.body._id) {
    asset = await Asset.findById(req.body._id);
  } else {
    asset = new Asset();
    // asset.creator = req.user._id;
  }
  asset.title = req.body.title;
  asset.description = req.body.description;
  if (req.file) {
    const fd = req.file;
    const data = fs.readFileSync(fd.path);
    asset.content_type = fd.mimetype;
    asset.content = data;
  }
  await asset.save();
  res.json({ success: true, _id: asset._id });
};

module.exports = upsert;
