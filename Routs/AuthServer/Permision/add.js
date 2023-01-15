import Permision from '../../../Models/Permision.js'
import { Router } from 'express'
import { ADD_PERMISION_SUCCESSFULL, SERVER_ERROR } from '../../../Constants/responses.js'
import eventEmitter from '../../../Helpers/GetEvents.js'

const router = Router()

router.post('/add', async (req, res) => {
    try {
        const { permision } = req.body
        await Permision.AddPermision({ PermisionName: permision })
        return res.status(ADD_PERMISION_SUCCESSFULL.status).json(ADD_PERMISION_SUCCESSFULL.message)
    }
    catch (err) {
        eventEmitter.emit('error.routs.permision.add',err)
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
})

export default router