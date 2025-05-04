require('dotenv').config();
const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.end('Hello world');
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}.`)
})