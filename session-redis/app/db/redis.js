const redis = require('redis');
// const Redis = require('ioredis');

const redisClient = redis.createClient({
    socket: {
        port: 6379,
        host: '172.17.0.1',
    },
    legacyMode: true
});
// const redisClient = new Redis(6379, '172.17.0.1');
redisClient.on('connect', () => {
    console.log("Redis Connected ...")
});
redisClient.on('ready', () => {
    console.log("Redis Ready ...")
});
redisClient.on('end', () => {
    console.log("Redis End ...")
});
redisClient.on('reconnecting', () => {
    console.log("Redis Reconnecting ...")
});
redisClient.on('error', (err) => {
    console.log("Redis Error ...", err);
});
(async function () {
    try{
        await redisClient.connect();
    }catch(error) {
        console.log(error);
    }
})()

module.exports = redisClient;