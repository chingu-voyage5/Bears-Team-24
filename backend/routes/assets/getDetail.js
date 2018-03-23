const Asset = require('../../models/asset');

const getDetail = async (req, res) => {
  const assetId = req.params.id;
  const asset = await Asset.findById(assetId);
  res.json(asset);
};

module.exports = getDetail;
