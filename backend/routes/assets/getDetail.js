const Asset = require('../../models/asset');

const getDetail = async (req, res) => {
  const assetId = req.params.id;
  const asset = await Asset.findById(assetId);
  // eslint-disable-next-line camelcase
  const { title, description, content_type } = asset;
  res.json({ title, description, content_type });
};

module.exports = getDetail;
