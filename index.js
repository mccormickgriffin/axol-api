const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require("./database/connection");


async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const appName = process.env.APP_NAME;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
  testDatabaseConnection();
});