import EventEmitter from 'events'
const eventEmitter = new EventEmitter()

eventEmitter.on('server.start', (Port) => {
    console.log(`server is listening on port ${Port} ...`)
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

eventEmitter.on('error.routs.permision.add', (mssage) => {
    console.log(`Error: ${mssage}. (error.routs.permision.add)`)
})

eventEmitter.on('error.routs.role.add', (mssage) => {
    console.log(`Error: ${mssage}. (error.routs.role.add)`)
})

export default eventEmitter