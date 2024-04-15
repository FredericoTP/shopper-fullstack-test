"use strict";
exports.__esModule = true;
const env = process.env.NODE_ENV || 'test';

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_NAME}-${env}`,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  }
};

module.exports = config;