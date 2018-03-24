const Asset = require('../../models/asset');

const getContent = async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  res.setHeader('content-type', asset.content_type);
  res.send(asset.content);
};

module.exports = getContent;
