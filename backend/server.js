/* eslint-disable no-console */

const promisify = require('es6-promisify');
const fs = require('fs');
const { db } = require('./models');
const app = require('./app');

// do not init the process if a crucial component can not start up
const initDb = db.init;
const initServer = promisify(app.listen, app);
async function init() {
  // check image upload dir
  const uploadDir = process.env.IMAGE_UPLOAD_DIR;
  if (fs.existsSync(uploadDir)) {
    console.info('image upload directory present');
  } else {
    try {
      // decimal 484 is octal 744
      fs.mkdirSync(uploadDir, 484);
      console.info(`created image upload directory: ${uploadDir}`);
    } catch (err) {
      // we can't get error EEXIST here so bail
      console.error(`Couldn't init file upload dir: ${err}`);
      process.exit(1);
    }
  }
  try {
    await initDb();
    console.log('Connected to database');
    await initServer(process.env.PORT || 3001);
  } catch (err) {
    console.error(`Couldn't init the app: ${err.message}`);
    // exit code for fatal exception
    process.exit(1);
  }
  console.log('server started PORT:', app.address().port);
}

const closeDb = db.close;
const closeServer = promisify(app.close, app);
async function stop() {
  // start with a normal exit code
  let exitCode = 0;
  try {
    await closeServer();
  } catch (err) {
    console.error(`Failed to close the app: ${err.message}`);
    exitCode = 1;
  }

  try {
    await closeDb();
    console.log('Closed database connection');
  } catch (err) {
    console.error(`Failed to close database: ${err.message}`);
    exitCode = 1;
  }
  return exitCode;
}

module.exports = {
  init,
  stop,
};
