import EventEmitter from 'events'
const eventEmitter = new EventEmitter()

eventEmitter.on('server.start', (Port) => {
    console.log(`server is listening on port ${Port} ...`)
})

eventEmitter.on('server.numworkers',(numWorkers)=>{
    console.log(`Master cluster setting up ${numWorkers} workers...`)
})

eventEmitter.on('server.online.workers',(processId)=>{
    console.log(`Worker ${processId} is online`)
})

eventEmitter.on('server.dead.workers',(code,processId,signal)=>{
    console.log('Worker ' + processId + ' died with code: ' + code + ', and signal: ' + signal)
})

eventEmitter.on('redis.connect', () => {
    console.log(`Redis has been connected...`)
})

eventEmitter.on('permisions.undefined', () => {
    console.log('there is no requierd permision for this route.')
})

eventEmitter.on('role.undefined', () => {
    console.log('there is no requierd role for this route')
})

eventEmitter.on('user.noRole', (username) => {
    console.log(`user ${username} dont have any roles. please define Roles for the user`)
})

eventEmitter.on('error', (mssage,location,method) => {
    console.log("\x1b[31m",`Error: ${mssage}. (${location})(${method})`)
})


export default eventEmitter