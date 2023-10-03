const express = require('express');
const app = express();
process.env.NODE_ENV = 'development';
global.gConfig = require('./config/config');


const port = global.gConfig.node_port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});