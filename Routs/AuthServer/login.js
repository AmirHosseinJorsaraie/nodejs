import User from '../../Models/User.js'
import RefreshToken from '../../Models/RegisterToken.js'
import express from 'express'
import JWT from 'jsonwebtoken'
import { USER_UNVERIFIED, USER_ERROR, SERVER_ERROR, LOGIN_SUCCESSFULL, BAD_REQUEST } from '../../Constants/responses.js'
import eventEmitter from '../../Helpers/GetEvents.js'
import Exception from '../../Models/Exception.js'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url) 

const router = express.Router()


router.post('/', async (req, res) => {

    try {
        const { username, password } = req.body

        if (username == '' || password == '') return res.status(BAD_REQUEST.status).json(BAD_REQUEST.message)

        var result = await User.UserVerification({ username, password })

        if (result.notVeryfied) return res.status(USER_UNVERIFIED.status).json(USER_UNVERIFIED.message)

        if (result.noRole) {
            eventEmitter.emit('user.noRole', username)
            return res.status(USER_ERROR.status).json(USER_ERROR.message)
        }

        var userPermisions = result.userPermisions
        var userRoles = result.userRoles

        const accessToken = JWT.sign({ username, password, userRoles, userPermisions }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIER_TIME })


        if (await RefreshToken.RefreshTokenExists(result.userId)) {
            var refToken = await RefreshToken.GetRefreshTokenByUserId(result.userId)
            return res.status(LOGIN_SUCCESSFULL.status).json({ accessToken: accessToken, refreshToken: refToken })
        }

        const refreshToken = JWT.sign({ username, password, userRoles, userPermisions }, process.env.REFRESH_SECRET_TOKEN)


        await RefreshToken.AddRefreshToken(refreshToken, result.userId)
        return res.status(LOGIN_SUCCESSFULL.status).json({ accessToken: accessToken, refreshToken: refreshToken })
    }
    catch (err) {
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/login')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
})


export default router
