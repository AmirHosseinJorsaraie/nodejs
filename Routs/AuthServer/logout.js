const RefreshToken = require('../../Repositories/RegisterTokenRepository')
const express = require('express')
const router = express.Router()

router.delete('/', async (req,res)=>{
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

module.exports = router