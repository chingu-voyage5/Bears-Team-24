const Asset = require('../../models/asset');

const getDetail = async (req, res) => {
  const assetId = req.params.id;
  const asset = await Asset.findById(assetId).populate('creator', 'username');
  // eslint-disable-next-line camelcase
  const { title, description, content_type, creator } = asset;
  res.json({ title, description, content_type, creator });
};

module.exports = getDetail;
