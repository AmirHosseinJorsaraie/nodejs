const express = require('express')
const router = express.Router()

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

router.get('/', (req, res) => {
    res
        .status(200)
        .append('Access-Control-Allow-Origin', ['*'])
        .json(posts)
})


module.exports = router
