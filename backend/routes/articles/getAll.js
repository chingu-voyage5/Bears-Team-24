const Article = require('../../models/article');

async function getAll(req, res) {
  const articles = await Article.find().populate('creator', 'username');
  res.json(articles);
}

module.exports = getAll;
