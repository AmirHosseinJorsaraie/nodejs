import User from '../../Models/User.js'
import RefreshToken from '../../Models/RegisterToken.js'
import express from 'express'
import JWT from 'jsonwebtoken'

const router = express.Router()



router.post('/', async (req, res) => {

    const { username, password } = req.body

    if (username == '' || password == '') return res.sendStatus(400)

    var result = await User.UserVerification({ username, password })

    if (!result.userId) return res.status(result.status).json(result.message)

    var userPermisions = result.userPermisions
    var userRoles = result.userRoles

    const accessToken = JWT.sign({ username, password, userRoles, userPermisions }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIER_TIME })


    if (await RefreshToken.RefreshTokenExists(result.userId)) {
        var refToken = await RefreshToken.GetRefreshTokenByUserId(result.userId)
        return res.status(200).json({ accessToken: accessToken, refreshToken: refToken })
    }

    const refreshToken = JWT.sign({ username, password, userRoles, userPermisions }, process.env.REFRESH_SECRET_TOKEN)

    try {
        await RefreshToken.AddRefreshToken(refreshToken, result.userId)
        return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
    }
    catch (err) {
        return res.status(401).json({ message: err })
    }
})


export default router
