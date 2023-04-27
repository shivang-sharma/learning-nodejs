const userDAO = require('../dao/userDao');

async function getProfile(email, password) {
    try {
        const user = await userDAO.getUserByEmail("shivang@email.com");
        return user;
    } catch(error) {
        console.log(error);
        return Promise.reject("Wrong Password or Email");
    }
}

module.exports = {getProfile};