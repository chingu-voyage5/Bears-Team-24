const Article = require('../../models/article');

const upsert = async (req, res) => {
  let article;
  if (req.body._id) {
    article = await Article.findById(req.body._id).populate('creator');
  } else {
    article = new Article();
    article.creator = req.user._id;
  }
  article.title = req.body.title;
  article.topic = req.body.topic;
  article.sub_topic = req.body.sub_topic;
  article.content = req.body.content;
  await article.save();
  res.json({
    success: true,
    _id: article._id,
  });
};

module.exports = upsert;
