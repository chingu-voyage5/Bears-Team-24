const Asset = require('../../models/asset');

async function getAll(req, res) {
  const assets = await Asset.find(
    {},
    {
      content_type: 1,
      creator: 1,
      title: 1,
      created: 1,
    }
  ).populate('creator', 'username');
  res.json(assets);
}

module.exports = getAll;
