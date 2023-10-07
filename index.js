const express = require('express');
const app = express();
require('dotenv').config();

const appName = process.env.APP_NAME;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});