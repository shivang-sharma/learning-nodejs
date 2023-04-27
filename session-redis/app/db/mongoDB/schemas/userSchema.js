const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:  String,
    secondName: String,
    email:   String,
    password: String,
    age: Number,
    role: Array
});

module.exports = userSchema;
  