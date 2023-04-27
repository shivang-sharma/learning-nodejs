const userSchema = require("../schemas/userSchema");
const mongodbConnection = require('../mongo');

const User = mongodbConnection.model('User', userSchema);

module.exports = User;