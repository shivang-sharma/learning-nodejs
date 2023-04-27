'use strict';

var express = require('express');
var app = express();
var customers = ['AAA', 'BBB', 'CCC'];

app.get('/api/customers', (req, res) => {
    res.json(customers);
})

module.exports = app;