const User = require('../../Repositories/UserRepository')
const express = require('express')
const router = express.Router()


router.post('/', async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return res.sendStatus(400)

    let message = await User.AddUser(username,password)
    res.json({message : message})
})

module.exports = router