const Article = require('../../models/article');

async function getArticleJSON(req, res) {
  // route /api/v1/articles/

  const query = {};

  await Article.find(query)
    .then(found => {
      res.json(found);
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error('getArticleJSON failed:', err));
}

module.exports = getArticleJSON;
