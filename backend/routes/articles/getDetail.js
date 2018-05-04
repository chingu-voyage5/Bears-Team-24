const Article = require('../../models/article');

const getDetail = async (req, res) => {
  const articleId = req.params.id;
  const article = await Article.findById(articleId)
    .populate('creator', 'username')
    .populate('topic')
    .populate('sub_topic');
  res.json(article);
};

module.exports = getDetail;
