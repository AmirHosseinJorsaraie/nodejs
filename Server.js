import express from 'express';
import env from 'dotenv';
import cluster from 'cluster';
import { cpus } from 'os';
import eventEmitter from './Helpers/GetEvents.js';
import postsRout from './Routs/Server/posts.js';
import swaggerDocument from './swagger/ServerSwagger.json' assert { type: "json" };
import swagger from 'swagger-ui-express'

env.config();

if (cluster.isPrimary) {
    var numWorkers = cpus().length;

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

    
    const app = express()
    const PORT = 3000
    // const eventEmitter = require('./Helpers/GetEvents')
    // const postsRout = require('./Routs/Server/posts')
    // const swaggerDocument = require('./swagger/ServerSwagger.json')
    // const swagger = require('swagger-ui-express')

    app.use('/posts', postsRout)

    app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument))
    app.listen(PORT, () => eventEmitter.emit('server.start', PORT))
}