const Article = require('../../models/article');

async function getArticleJSON(req, res) {
  // route /api/v1/articles/

  const query = {};

  await Article.find(query)
    .then(found => {
      res.json(found);
    })
    .catch(err => console.log(err));
}

module.exports = getArticleJSON;
