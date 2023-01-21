import express from 'express'
import Post from '../../Models/Post.js'
import {fileURLToPath} from 'url';
import { GET_POSTS_SUCCESSFULL, ACCESS_CONTROL_ALLOW_ORIGIN, SERVER_ERROR, NO_POSTS } from '../../Constants/responses.js';
import Exception from '../../Models/Exception.js';
import eventEmitter from '../../Helpers/GetEvents.js';
const __filename = fileURLToPath(import.meta.url) 

const router = express.Router()


router.get('/', async (req, res) => {
    
    try{
        const posts = await Post.GetPosts()
        let pageNumber = parseInt(req.query.pageNumber) || 1
        let limit = parseInt(req.query.limit) || 12
        let startIndex = pageNumber == 0 ? 0 : (pageNumber - 1) * limit
        let lastIndex = pageNumber * limit
        let results = posts.slice(startIndex, lastIndex)
        
        if(results.length == 0){
            return res.status(NO_POSTS.status).json(NO_POSTS.message)
        }
    
        return res
            .status(GET_POSTS_SUCCESSFULL.status)
            .append(ACCESS_CONTROL_ALLOW_ORIGIN, ['*'])
            .json(results)
    }
    catch(err){
        if (err instanceof Exception) eventEmitter.emit('error', err.message, err.location, err.method)
        else eventEmitter.emit('error', err, __filename, '/posts')
        return res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }
   
})

export default router
