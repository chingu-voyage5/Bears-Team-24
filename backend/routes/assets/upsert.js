const fs = require('fs');
const Asset = require('../../models/asset');

const upsert = async (req, res) => {
  const create = req.body._id ? true : false;
  let asset;
  if (create) {
    asset = new Asset();
  } else {
    asset = await Asset.findById(req.body._id);
  }
  asset.active = true;
  asset.type = req.body.type;
  asset.creator = req.body.creator;
  asset.last_updated = new Date();
  const fd = req.files[0];
  const data = fs.readFileSync();
  asset.content_type = fd.mimetype;
  asset.content = data;
  await asset.save();
  res.json(asset);
};

module.exports = upsert;
