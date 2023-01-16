import Permision from '../../../Models/Permision.js'
import { Router } from 'express'
import { ADD_PERMISION_SUCCESSFULL, SERVER_ERROR } from '../../../Constants/responses.js'
import eventEmitter from '../../../Helpers/GetEvents.js'
import Exception from '../../../Models/Exception.js'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url) 

const router = Router()

router.post('/add', async (req, res) => {
    try {
        const { permision } = req.body
        await Permision.AddPermision({ PermisionName: permision })
        return res.status(ADD_PERMISION_SUCCESSFULL.status).json(ADD_PERMISION_SUCCESSFULL.message)
    }
    catch (err) {
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/add')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
})

export default router