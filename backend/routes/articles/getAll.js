const Article = require('../../models/article');

async function getAll(req, res) {
  const articles = await Article.find(
    {},
    {
      topic: 1,
      sub_topic: 1,
      title: 1,
      creator: 1,
    }
  ).populate('creator', 'username');
  res.json(articles);
}

module.exports = getAll;
