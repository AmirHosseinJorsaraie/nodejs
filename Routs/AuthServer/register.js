import User from '../../Models/User.js'
import IpRateLimit from '../../Middlewares/IpRateLimitter.js'
import { ADD_USER_SUCCESSFULL, BAD_REQUEST, SERVER_ERROR } from '../../Constants/responses.js'
import express from 'express'
import eventEmitter from '../../Helpers/GetEvents.js'
import Exception from '../../Models/Exception.js'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url) 

const router = express.Router()

router.post('/', IpRateLimit, async (req, res) => {
    
    try{
        const { username, password, roles } = req.body
        if (!username || !password) return res.status(BAD_REQUEST.status).json(BAD_REQUEST.message)
        if (!roles || roles.length == 0) return res.status(BAD_REQUEST.status).json(BAD_REQUEST.message)
        await User.AddUser(username, password, roles)
        return res.status(ADD_USER_SUCCESSFULL.status).json(ADD_USER_SUCCESSFULL.message)
    }
    catch(err){
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/register')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
})

export default router
