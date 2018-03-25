const Asset = require('../../models/asset');

async function getAll(req, res) {
  const assets = await Asset.find(
    {},
    {
      content_type: 1,
      owner: 1,
      title: 1,
      created: 1,
    }
  );
  res.json(assets);
}

module.exports = getAll;
