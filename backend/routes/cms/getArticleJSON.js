const Article = require('../../models/article');

async function getArticleJSON(req, res) {
  // route /api/v1/articles/:id
  const { id } = req.params;
  let query = {};

  // valid or not Mongo ObjectID
  

  await Article.find(query).then(found => {
    if (found.length === 0) {
      // not found specified id - show all
      res.redirect('/api/v1/articles/');
      return;
    }

    res.json(found);
  });
}

module.exports = getArticleJSON;
