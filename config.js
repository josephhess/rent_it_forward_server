'use strict';

require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/rent',
  TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/rent-test'
};
