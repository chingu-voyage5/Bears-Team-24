/* eslint-disable no-console */

const promisify = require('es6-promisify');
const { db } = require('./models');
const app = require('./app');

// do not init the process if a crucial component can not start up
const initDb = db.init;
const initServer = promisify(app.listen, app);
async function init() {
  try {
    await initDb();
    console.log('Connected to database');
    await initServer(process.env.port || 3001);
  } catch (err) {
    console.error(`Couldn't init the app: ${err.message}`);
    // exit code for fatal exception
    process.exit(1);
  }
  console.log('server started port:', app.address().port);
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
  stop
};
