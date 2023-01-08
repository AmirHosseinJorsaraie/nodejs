import redis from 'redis';
import eventEmitter from './GetEvents.js';
const redisClient = redis.createClient()

    ; (async () => {
        await redisClient.connect()
        eventEmitter.emit('redis.connect')
    })()

export default redisClient
