const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('server.start',(Port)=>{
    console.log(`server is listening on port ${Port} ...`)
})


module.exports = eventEmitter