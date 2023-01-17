import dotenv from 'dotenv';
dotenv.config();
import cluster from 'cluster';
import { cpus } from 'os';
import * as ModelConfig from './Helpers/DbConfigModels_Auth.js';
import express from 'express'
import eventEmitter from './Helpers/GetEvents.js';
import swaggerDocument from './swagger/AuthServerSwagger.json' assert { type: "json" };
import swagger from 'swagger-ui-express';
import Routes from "./Constants/AuthServer/routs.js"



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
    app.use(express.json())
    Routes.forEach((r) => {
        app.use(r.route, r.middlewares, r.router)
    })
    app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument))
    app.listen(process.env.PORT, () => eventEmitter.emit('server.start', process.env.PORT))
}



