'use strict';

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/rent',
  TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/rent-test',
  JWT_SECRET: '1234THREE888Q',
  JWT_EXPIRY: '1296000'


};
