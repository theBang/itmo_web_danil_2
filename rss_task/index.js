const express = require('express');
const cors = require('cors');
const { promises: { readFile } } = require('fs');

const getLinks = require('./get-links');

const PORT = 3000;
const app = express();


app
  .use(express.json())
  .get('/', async (req, res) => res.redirect('/rss'))
  .get('/links', cors(), async (req, res) => {
    res.json(await getLinks(req.body.n));
  })
  .post('/links', cors(), async (req, res) => {
    res.json(await getLinks(req.body.n));
  })
  .get('/rss', async (req, res) => 
    res.send(await readFile('./index.html', { encoding: 'utf-8' })))
  .listen(PORT, () => console.log(process.pid));