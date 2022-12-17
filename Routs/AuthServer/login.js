const User = require('../../Repositories/UserRepository')
const RefreshToken = require('../../Repositories/RegisterTokenRepository')
const express = require('express')
const JWT = require('jsonwebtoken')
const router = express.Router()

router.post('/', async (req, res) => {

    const { username, password } = req.body

    if (username == '' || password == '') return res.sendStatus(400)

    var result = await User.UserVerification({ username, password })

    if (!result.userId) return res.status(result.status).json(result.message)
    
    var userRoles = [];
    result.userRoles.forEach(roles => {
        userRoles.push({RoleName:roles.dataValues.RoleName , id: roles.dataValues.RoleName})
    });

    const accessToken = JWT.sign({ username, password , userRoles}, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '2m' })

    if (await RefreshToken.RefreshTokenExists(result.userId)) {
        var refToken = await RefreshToken.GetRefreshTokenByUserId(result.userId)
        return res.status(200).json({ accessToken: accessToken, refreshToken: refToken })
    }

    const refreshToken = JWT.sign({ username, password ,userRoles }, process.env.REFRESH_SECRET_TOKEN)

    try {
        await RefreshToken.AddRefreshToken(refreshToken, result.userId)
        return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
    }
    catch (err) {
        return res.status(401).json({message: err})
    }
})


module.exports = router