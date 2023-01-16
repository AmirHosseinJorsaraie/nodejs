import RefreshToken from '../../Models/RegisterToken.js'
import IpRateLimit from '../../Middlewares/IpRateLimitter.js'
import { REFRESH_TOKEN_NOT_FOUND, AUTHORIZATION_HEADER, ACCESS_TOKEN_REFRESHED_SUCCESSFULL, SERVER_ERROR} from '../../Constants/responses.js'
import JWT from 'jsonwebtoken'
import express from 'express'
import Exception from '../../Models/Exception.js'
import eventEmitter from '../../Helpers/GetEvents.js'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url) 

const router = express.Router()

router.post('/', IpRateLimit, async (req, res) => {

    try {
        const { token } = req.body
        const refToken = await RefreshToken.GetRefreshToken(token)
        if (!refToken) return res.status(REFRESH_TOKEN_NOT_FOUND.status).json(REFRESH_TOKEN_NOT_FOUND.message)
        JWT.verify(refToken, process.env.REFRESH_SECRET_TOKEN, ((err, user) => {
            if (err) return res.status(AUTHORIZATION_HEADER.status).json(AUTHORIZATION_HEADER.message)
            const accessToken = JWT.sign(user, process.env.ACCESS_SECRET_TOKEN)
            return res.status(ACCESS_TOKEN_REFRESHED_SUCCESSFULL.status).json({ accessToken: accessToken })
        }))
    }
    catch (err) {
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/refresh')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
})


export default router
