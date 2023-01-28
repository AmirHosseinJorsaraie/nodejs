import express from 'express';
import env from 'dotenv';
import cluster from 'cluster';
import { cpus } from 'os';
import eventEmitter from './Helpers/GetEvents.js';
import DbConfigModels_Main from './Helpers/DbConfigModels_Main.js';
import routs from './Constants/Server/routs.js';
import swaggerDocument from './swagger/ServerSwagger.json' assert { type: "json" };
import swagger from 'swagger-ui-express'

env.config()

if (cluster.isPrimary) {
    var numWorkers = cpus().length

    eventEmitter.emit('server.numworkers', numWorkers)

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork()
    }

    cluster.on('online', function (worker) {
        eventEmitter.emit('server.online.workers', worker.process.pid)
    });

    cluster.on('exit', function (worker, code, signal) {
        eventEmitter.emit('server.dead.workers',(code,worker.process.pid,signal))
        cluster.fork()
    });

} else {

    const app = express()
    app.use(express.json())
    const PORT = process.env.MAIN_SERVER_PORT
   
    routs.forEach((r)=>{
        app.use(r.route,r.middlewares,r.router)
    })

    app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument))
    app.listen(PORT, () => eventEmitter.emit('server.start', PORT))
}