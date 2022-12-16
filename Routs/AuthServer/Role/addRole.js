const RoleRepo = require('../../../Repositories/RoleRepository')
const express = require('express')
const router = express.Router()

router.post('/', async (req,res)=>{
    const {role , permisions} = req.body
    const result = await RoleRepo.AddRole({RoleName: role, RolePermisions: permisions})
    return res.json(result)
})

module.exports = router