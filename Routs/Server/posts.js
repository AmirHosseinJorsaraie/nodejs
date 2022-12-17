const express = require('express')
const router = express.Router()
const authenticateToken = require('../../Helpers/AuthenticateToken')

const posts = [
    {
        username: 'AUK',
        title: 'Post 1'
    },
    {
        username: 'GIS',
        title: 'Post 2'
    }
]

router.get('/', authenticateToken, CheckPermisions ,(req, res) => {
    res
        .status(200)
        .append('Access-Control-Allow-Origin', ['*'])
        .json(posts)
})

function CheckPermisions(req,res,next){
    next()
}

module.exports = router
