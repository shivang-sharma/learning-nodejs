const authService = require('../service/authentication');

async function loginController(req, res, next) {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json("Bad Request - you need to provide email and password");
    }
    try {
        const user = await authService.login(email, password);
        req.session.user = user;
        res.sendStatus(204);
    } catch(error) {
        console.log(error);
        res.status(401).json(error);
    }
}

function logoutController(req, res, next) {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to logout');
            } else {
                res.status(204).send();
            }
        });
    } else {
        res.end();
    }
}

module.exports = {loginController, logoutController};