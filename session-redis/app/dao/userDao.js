const User = require('../db/mongoDB/models/userModel');

function getUserByEmail(emailId) {
    return new Promise((resolve, reject) => {
        User
        .findOne({email:emailId})
        .exec((error, user) => {
            if (error) {
                reject(error);
            }
            resolve(user);
        });
    })
}

module.exports = {getUserByEmail}