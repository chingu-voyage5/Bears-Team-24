const Article = require('../../models/article');
// eslint-disable-next-line no-unused-vars
const { Topic } = require('../../models/topic');

const articleCompare = (a, b) => {
  if (a.topic.order < b.topic.order) {
    return -1;
  }
  if (a.topic.order > b.topic.order) {
    return 1;
  }
  if (a.sub_topic.order < b.sub_topic.order) {
    return -1;
  }
  if (a.sub_topic.order > b.sub_topic.order) {
    return 1;
  }
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
};

async function getAll(req, res) {
  let articles;
  try {
    articles = await Article.find(
      {},
      {
        topic: 1,
        sub_topic: 1,
        title: 1,
        creator: 1,
        order: 1,
      }
    )
      .populate('creator', 'username')
      .populate('topic')
      .populate('sub_topic');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('article getAll failed:', e);
  }
  articles.sort(articleCompare);
  res.json(articles);
}

module.exports = getAll;
