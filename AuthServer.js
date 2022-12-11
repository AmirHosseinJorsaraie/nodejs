require('dotenv').config()
const express = require('express')
const loginRout = require('./Routs/AuthServer/login')
const registerRout = require('./Routs/AuthServer/register')
const refreshRout = require('./Routs/AuthServer/refresh')
const logoutRout = require('./Routs/AuthServer/logout')
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
app.use('/login',loginRout)
app.use('/register',registerRout)
app.use('/refresh',refreshRout)
app.use('/logout',logoutRout)
app.listen(process.env.PORT,()=>console.log(`connected to port ${process.env.PORT} ...`))