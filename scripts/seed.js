/* eslint-disable */
require('dotenv').config();
console.info('use db:', process.env.MONGO_URI);

const { db } = require('../backend/models');
const User = require('../backend/models/user');
const Article = require('../backend/models/article');
const { Topic, SubTopic} = require('../backend/models/topic');
const seedVoyage = require('./seedVoyage');
const seedPmrok = require('./seedPmrok');

connect = async () => {
  try {
    await db.init();
  } catch (e) {
    console.error('db init failed:', e);
    process.exit(1);
  }
}
tearDown = async () => {
  try {
    await Article.remove({});
    await User.remove({});
    await Topic.remove({});
    await SubTopic.remove({});
  } catch (e) {
    console.error('teardown db failed:', e);
    process.exit(1);
  }
};
createSysUser = async () => {
  const user = new User();
  user.username = 'sys';
  user.email = 'none';
  user.role = 'admin';
  user.bio = 'sys';
  try {
    await user.save();
  } catch (e) {
    console.error('create sys user failed:', e);
    process.exit(1);
  }
  return user._id;
};

seeder = async () => {
  await connect();
  await tearDown();
  sys_id = await createSysUser();
  console.log('sys user _id:', sys_id);
  await seedVoyage(sys_id);
  await seedPmrok(sys_id);
  process.exit(0);
};

seeder();
