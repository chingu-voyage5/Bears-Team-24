require('dotenv').config();
// console.info('use db:', process.env.MONGO_URI);

// process.env.MONGO_URI = 'mongodb://localhost:27017/cms_test';

const { db } = require('../backend/models');
const Article = require('../backend/models/article');
const { Topic } = require('../backend/models/topic');

async function connect() {
  try {
    await db.init();
  } catch (e) {
    console.error('db init failed:', e);
    process.exit(1);
  }
}

async function getAll() {
  const articles = await Article.find(
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

  articles.sort((a, b) => {
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
  });
  return articles;
}

async function go() {
  await connect();
  const articles = await getAll();
  // console.log('articles:', articles);
  articles.forEach(article => {
    console.log(`${article.topic.name}[${article.topic.order}] : \
      ${article.sub_topic.name}[${article.sub_topic.order}] \
      ${article.title}[${article.order}]`);
  });
  process.exit(0);
}

go();
console.log('finished');
