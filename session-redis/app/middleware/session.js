const session = require('express-session');
const connectRedis = require('connect-redis');
const redisClient = require('../db/redis');

const RedisStore = connectRedis(session);

module.exports = session({
    store: new RedisStore({client: redisClient}),
    secret: 'helloredis',
    saveUninitialized:false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly:true,
        maxAge: 1000 * 60
    }
});