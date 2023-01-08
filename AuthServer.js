import dotenv from 'dotenv';
dotenv.config();
import cluster from 'cluster';
import { cpus } from 'os';
import * as ModelConfig from './Helpers/DbConfigModels.js';
import express from 'express'
import eventEmitter from './Helpers/GetEvents.js';
import swaggerDocument from './swagger/AuthServerSwagger.json' assert { type: "json" };
import swagger from 'swagger-ui-express';
import loginRout from './Routs/AuthServer/login.js';
import registerRout from './Routs/AuthServer/register.js';
import refreshRout from './Routs/AuthServer/refresh.js';
import logoutRout from './Routs/AuthServer/logout.js';
import addPermision from './Routs/AuthServer/Permision/addPermision.js';
import addRole from './Routs/AuthServer/Role/addRole.js';
import posts from './Routs/AuthServer/ServerProxyRouts/posts.js';


if(cluster.isPrimary) {
 var numWorkers = cpus().length;

 console.log('Master cluster setting up ' + numWorkers + ' workers...');

 for(var i = 0; i < numWorkers; i++) {
  cluster.fork();
 }

 cluster.on('online', function(worker) {
  console.log('Worker ' + worker.process.pid + ' is online');
 });

 cluster.on('exit', function(worker, code, signal) {
  console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
  console.log('Starting a new worker');
  cluster.fork();
 });

} else {
    const app = express()

    // (async ()=>{
    //     await _user.AddUser('testUser','@134')
    // })();


    // _user.GetUsers().then((result)=> {
    //     result.forEach((u)=>{
    //         console.log(u.dataValues)
    //     })
    // })
    app.use(express.json())
    app.use('/login', loginRout)
    app.use('/register', registerRout)
    app.use('/refresh', refreshRout)
    app.use('/logout', logoutRout)
    app.use('/addPermision', addPermision)
    app.use('/addRole', addRole)
    app.use('/posts', posts)
    app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument))
    app.listen(process.env.PORT, () => eventEmitter.emit('server.start', process.env.PORT))
}



