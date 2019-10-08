const express = require('express');
const cors = require('cors');
const getLinks = require('./get-links');

const PORT = 3000;
const app = express();

app.use(cors());

app.get('/', cors(), async (req, res) => {
  res.send(await getLinks());
});

app.get('/f', async (req, res) => {
  res.send('<html><head></head><body><script></script></body></html>');
});

app.listen(PORT, () => console.log(process.pid));