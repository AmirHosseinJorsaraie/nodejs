const redis = require('redis')
const eventEmitter = require('./GetEvents')
const redisClient = redis.createClient()

connect()

redisClient.on('connect',()=>eventEmitter.emit('redis.connect'))

async function connect(){
    await redisClient.connect()
}

