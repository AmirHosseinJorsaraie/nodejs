import Role from '../../../Models/Role.js'
import { Router } from 'express'
import { ADD_ROLE_SUCCESSFULL, SERVER_ERROR } from '../../../Constants/responses.js'
import eventEmitter from '../../../Helpers/GetEvents.js'
import Exception from '../../../Models/Exception.js'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url) 

const router = Router()

router.post('/add', async (req, res) => {
    try {
        const { role, permisions } = req.body
        await Role.AddRole({ RoleName: role, RolePermisions: permisions })
        return res.status(ADD_ROLE_SUCCESSFULL.status).json(ADD_ROLE_SUCCESSFULL.message)
    }
    catch (err) {
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/add')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }

})

export default router