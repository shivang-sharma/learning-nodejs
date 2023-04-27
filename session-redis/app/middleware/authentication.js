function authMiddleware(req, res, next) {
    if (!req.session || !req.session.user){
        res.status(400).json('Error not logged in');
    } else{
        next();
    }
}

module.exports = authMiddleware;