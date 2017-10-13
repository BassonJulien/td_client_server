const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const jsonParser = bodyParser.json();

app.use(morgan('tiny')); // mettez dev

const add = (a, b) => String(Number(a) + Number(b));
const subtract = (a, b) => String(Number(a) - Number(b));
const multiply = (number, number2) => String(Number(number) * Number(number2));
const facto = a => (a <= 1) ? 1 : a * facto(a - 1);

app.get('/add', (req, res) => {
  res.send(add(req.params.a, req.params.b));
});

app.get('/subtract', (req, res) => {
  res.send(subtract(req.params.a, req.params.b));
});

app.get('/multiply', (req, res) => {
  res.send(multiply(req.params.a, req.params.b));
});

app.get('/facto', (req, res) => {
  res.send(String(facto(Number(req.params.a))));
});

app.post('/add', jsonParser, (req, res) => {
  res.send({result: req.body.numbers.reduce((a, b) => a + b)});
});

app.listen(5353, () => {
  console.log('Server ready');
});