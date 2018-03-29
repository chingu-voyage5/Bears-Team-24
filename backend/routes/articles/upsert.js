const Article = require('../../models/article');
const User = require('../../models/user');

const upsert = async (req, res) => {
  let article;
  let user;
  if (req.body._id) {
    article = await Article.findById(req.body._id).populate('creator');
    user = article.creator;
  } else {
    user = await User.findById(req.user._id);
    article = new Article();
    article.creator = req.user._id;
  }
  // eslint-disable-next-line camelcase
  const { title, topic, sub_topic, content } = req.body;
  article = { ...article, title, topic, sub_topic, content };
  await article.save();
  res.json({
    success: true,
    _id: article._id,
    creator: { _id: user._id, username: user.username },
  });
};

module.exports = upsert;
