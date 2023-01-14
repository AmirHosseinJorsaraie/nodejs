import RefreshToken from '../../Models/RegisterToken.js'
import IpRateLimit from '../../Middlewares/IpRateLimitter.js'
import express from 'express'
const router = express.Router()

router.delete('/', IpRateLimit, async (req, res) => {
    const {token} = req.body
    
    if(!token) return res.sendStatus(400)
    
    const refToken = await RefreshToken.GetRefreshToken(token)

    if(!refToken) return res.status(404).json({message: 'refresh token not found!'})

    try{
        await RefreshToken.DeleteRefreshToken(refToken)
        return res.status(200).json({message : 'You have been logout successfully!'})
    }
    catch(err){
        return res.status(403).json({message: err})
    }


    
})

export default router
