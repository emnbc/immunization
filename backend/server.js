#!/usr/bin/env node
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const dbsorting = require('./shared/dbsorting');
const db = require('./shared/db');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(dbsorting.setParams);
app.use(express.static('../frontend/dist'));

app.use('/api', routes);

app.all('*', (req, res) => {
  // .replace() - костыль для запуска сервера на Windows. Нужно менять обратные слеши на нормальные.
  dirname = path.join(__dirname, '../frontend/dist/index.html').replace(/\\/g, '/');
  res.sendFile(dirname);
});

// erroror handling
app.use((error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    next(error);
  }
});

db.connect('mongodb://localhost:27017', (err) => {
  if(err) return console.log(err);
  app.listen(port, () => {
    console.log('Express API started: http://localhost:' + port);
  });
});