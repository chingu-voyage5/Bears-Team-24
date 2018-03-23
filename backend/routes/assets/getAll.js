const Asset = require('../../models/asset');

async function getAll(req, res) {
  const assets = await Asset.find({});
  res.json(assets);
};

module.exports = getAll;
