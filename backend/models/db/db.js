const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

async function init() {
  await mongoose.connect(process.env.MONGO_URI);
}

async function close() {
  await mongoose.connection.close();
}

module.exports = {
  init,
  close
};
