const redis = require('redis')
const redisClient = redis.createClient()
const eventEmitter = require('./GetEvents')

    ; (async () => {
        await redisClient.connect()
        eventEmitter.emit('redis.connect')
    })()

module.exports = redisClient
