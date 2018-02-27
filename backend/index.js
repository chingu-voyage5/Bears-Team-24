/* eslint-disable no-console */
/* eslint-disable global-require */
// dotenv does not need to be in dependencies
/* eslint-disable import/no-extraneous-dependencies */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

init();
