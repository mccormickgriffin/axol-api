const express = require('express');
var { expressjwt: jwt } = require("express-jwt");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require("./database/connection");
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
      origin: [process.env.WEBAPP_URL],
      credentials: true
  })
);
app.use(
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })
      .unless({ path: [`${process.env.API_PREFIX}/auth/login`] })
);

// Routes
app.use(`${process.env.API_PREFIX}/auth`, authRoutes);
app.use(`${process.env.API_PREFIX}/user`, userRoutes);

app.use(errorHandler);

// Server
const appName = process.env.APP_NAME;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
  testDatabaseConnection();
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}