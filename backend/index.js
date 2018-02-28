/* eslint-disable global-require */
// dotenv does not need to be in dependencies
/* eslint-disable import/no-extraneous-dependencies */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./server').init();
