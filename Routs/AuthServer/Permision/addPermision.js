const PermisionRepo = require('../../../Repositories/PermisionRepository')
const express = require('express')
const router = express.Router()

router.post('/', async (req,res)=>{
    const {permision} = req.body
    const result = await PermisionRepo.AddPermision({PermisionName: permision})
    return res.json(result)
})

module.exports = router