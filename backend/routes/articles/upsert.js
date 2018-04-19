const Article = require('../../models/article');
const History = require('../../models/history');

const upsert = async (req, res) => {
  let article;
  let sizePre = 0;
  if (req.body._id) {
    article = await Article.findById(req.body._id).populate('creator');
    sizePre = article.content.length;
  } else {
    article = new Article();
    article.creator = req.user._id;
  }
  article.title = req.body.title;
  article.topic = req.body.topic;
  article.sub_topic = req.body.sub_topic;
  article.content = req.body.content;
  try {
    await article.save();
    const history = new History({
      contributor: req.user._id,
      article: article._id,
      sizePre,
      sizePost: article.content.length,
    });
    await history.save();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('article upsert failed:', e);
    return res.json({ success: false, error: e.messageText });
  }
  return res.json({
    success: true,
    _id: article._id,
  });
};

module.exports = upsert;
