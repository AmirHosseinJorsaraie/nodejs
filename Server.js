var cluster = require('cluster');

if (cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

} else {


    require('dotenv').config()
    const express = require('express')
    const app = express()
    const PORT = 3000
    const eventEmitter = require('./Helpers/GetEvents')
    const postsRout = require('./Routs/Server/posts')
    const swaggerDocument = require('./swagger/ServerSwagger.json')
    const swagger = require('swagger-ui-express')

    app.use('/posts', postsRout)

    app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument))
    app.listen(PORT, () => eventEmitter.emit('server.start', PORT))
}
