const mongoose = require('mongoose');

const mongodbConnection = mongoose.createConnection("mongodb://172.17.0.1:27017/redis-session");

module.exports = mongodbConnection;