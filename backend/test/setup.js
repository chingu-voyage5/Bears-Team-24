/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// use different env vars for the tests!
require('dotenv').config({ path: '.env.test' });
// eslint-disable-next-line no-unused-vars
const chai = require('chai');
const server = require('../server');

before(async () => {
  await server.init();
});

after(async () => {
  await server.stop();
});
