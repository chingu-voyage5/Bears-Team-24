const Asset = require('../../models/asset');

const getContent = async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (asset.content) {
    res.setHeader('content-type', asset.content_type);
    res.send(asset.content);
  } else {
    res.send('Image not found');
  }
};

module.exports = getContent;
