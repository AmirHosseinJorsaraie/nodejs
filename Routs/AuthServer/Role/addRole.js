import Role from '../../../Models/Role.js'
import { Router } from 'express'
const router = Router()

router.post('/', async (req,res)=>{
    const {role , permisions} = req.body
    const result = await Role.AddRole({RoleName: role, RolePermisions: permisions})
    return res.json(result)
})

export default router