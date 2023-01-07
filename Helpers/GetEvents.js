const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('server.start',(Port)=>{
    console.log(`server is listening on port ${Port} ...`)
})

eventEmitter.on('redis.connect',()=>{
    console.log(`Redis has been connected...`)
})

module.exports = eventEmitter