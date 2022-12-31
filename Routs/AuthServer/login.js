const User = require('../../Models/User')
const RefreshToken = require('../../Models/RegisterToken')
const express = require('express')
const JWT = require('jsonwebtoken')
const router = express.Router()
const IpRateLimit = require('../../Helpers/IpRateLimitter') 


router.post('/', IpRateLimit ,async (req, res) => {

    const { username, password } = req.body
    
    if (username == '' || password == '') return res.sendStatus(400)

    var result = await User.UserVerification({ username, password })

    if (!result.userId) return res.status(result.status).json(result.message)
    
    var userPermisions = result.userPermisions 
    var userRoles = []
    result.userRoles.forEach(roles => {
        userRoles.push({RoleName:roles.dataValues.RoleName , id: roles.dataValues.RoleName})
    });

    const accessToken = JWT.sign({ username, password , userRoles , userPermisions}, process.env.ACCESS_SECRET_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIER_TIME})


    if (await RefreshToken.RefreshTokenExists(result.userId)) {
        var refToken = await RefreshToken.GetRefreshTokenByUserId(result.userId)
        return res.status(200).json({ accessToken: accessToken, refreshToken: refToken })
    }

    const refreshToken = JWT.sign({ username, password ,userRoles , userPermisions}, process.env.REFRESH_SECRET_TOKEN)

    try {
        await RefreshToken.AddRefreshToken(refreshToken, result.userId)
        return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
    }
    catch (err) {
        return res.status(401).json({message: err})
    }
})


module.exports = router
