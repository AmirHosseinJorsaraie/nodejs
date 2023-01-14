import Permision from '../../../Models/Permision.js'
import { Router } from 'express'

const router = Router()

router.post('/add', async (req, res) => {
    const { permision } = req.body
    const result = await Permision.AddPermision({ PermisionName: permision })
    return res.json(result)
})

export default router