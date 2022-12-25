const RefreshToken = require('../../Repositories/RegisterTokenRepository')
const IpRateLimit = require('../../Helpers/IpRateLimitter')
const JWT = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.post('/', IpRateLimit, async (req, res) => {
    const {token} = req.body
    const refToken = await RefreshToken.GetRefreshToken(token)
    if(!refToken) return res.status(403).json({message : 'The refresh token is not exists!'})
    JWT.verify(refToken,process.env.REFRESH_SECRET_TOKEN,((err,user)=>{
        if(err) return res.sendStatus(404)
        const accessToken =  JWT.sign({user},process.env.ACCESS_SECRET_TOKEN)
        return res.status(200).json({accessToken : accessToken})
    }))
})


module.exports = router
