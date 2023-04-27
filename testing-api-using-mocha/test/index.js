'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('Correct users returned', function(t) {
    request(app)
    .get('/api/customers')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        var expectedCustomers = ['AAA', 'BBB', 'CCC'];
        t.error(err, 'No Error');
        t.same(res.body, expectedCustomers, 'Customers as expected');
        t.end();
    });
});