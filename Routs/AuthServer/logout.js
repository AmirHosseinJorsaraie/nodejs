import RefreshToken from '../../Models/RegisterToken.js'
import IpRateLimit from '../../Middlewares/IpRateLimitter.js'
import { SERVER_ERROR, LOGOUT_SUCCESSFULL, REFRESH_TOKEN_NOT_FOUND, BAD_REQUEST } from '../../Constants/responses.js'
import express from 'express'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url) 
const router = express.Router()

router.delete('/', IpRateLimit, async (req, res) => {
   
    try {
        const { token } = req.body

        if (!token) return res.status(BAD_REQUEST.status).json(BAD_REQUEST.message)

        const refToken = await RefreshToken.GetRefreshToken(token)

        if (!refToken) return res.status(REFRESH_TOKEN_NOT_FOUND.status).json(REFRESH_TOKEN_NOT_FOUND.message)

        await RefreshToken.DeleteRefreshToken(refToken)
        return res.status(LOGOUT_SUCCESSFULL.status).json(LOGOUT_SUCCESSFULL.message)
    }
    catch (err) {
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/logout')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
})

export default router
