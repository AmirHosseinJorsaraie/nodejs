import express from 'express'
import Post from '../../Models/Post.js'
const router = express.Router()

const posts = await Post.GetPosts()

router.get('/', (req, res) => {

    let pageNumber = parseInt(req.query.pageNumber) || 1
    let limit = parseInt(req.query.limit) || 12
    let startIndex = pageNumber == 0 ? 0 : (pageNumber - 1) * limit
    let lastIndex = pageNumber * limit
    let results = posts.slice(startIndex, lastIndex)

    res
        .status(200)
        .append('Access-Control-Allow-Origin', ['*'])
        .json(results)
})

export default router
