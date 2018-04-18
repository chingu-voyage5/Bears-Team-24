const Article = require('../../models/article');
const { ObjectId } = require('mongodb');

async function getArticleJSON(req, res) {
  // route /api/v1/articles/

  const query = req.params.id ? { _id: ObjectId(req.params.id) } : {};
  await Article.find(query)
    .then(found => {
      res.json(found);
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error('getArticleJSON failed:', err));
}

module.exports = getArticleJSON;
