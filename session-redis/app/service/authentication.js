const bcrypt = require('bcrypt');
const userDAO = require('../dao/userDao');

async function login(email, password) {
    try {
        const user = await userDAO.getUserByEmail(email);
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return {
                firstName:  user.firstName,
                secondName: user.secondName,
                email:   user.email,
                age: user.age,
                role: user.role
            }
        } else {
            return Promise.reject("Wrong Password or Email");
        }
    } catch(error) {
        console.log(error);
        return Promise.reject("Wrong Password or Email");
    }
}

module.exports = {login};