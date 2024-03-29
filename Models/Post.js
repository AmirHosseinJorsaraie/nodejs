import { Model } from '../Helpers/DatabaseConnection.js';
import redisClient from '../Helpers/RedisClient.js';
import Exception from './Exception.js';
import {fileURLToPath} from 'url';
import UpdateData from '../Helpers/GenericDTO.js';
const __filename = fileURLToPath(import.meta.url) 

class Post extends Model { }

Post.GetPosts = async function () {

    try {
        let exists = await redisClient.exists('Posts')

        if (exists == 0) {
            await UpdateData(Post,'Posts')
        }

        let posts = await redisClient.SMEMBERS('Posts', 0, -1)
        posts.forEach((p, index) => {
            posts[index] = JSON.parse(p)
        })

        return posts
    }
    catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err, __filename, Post.GetPosts.name)
    }
}

Post.AddPost = async function (post) {

    try {
        await Post.create({ title: post.title, content: post.content })
        await UpdateData(Post,'Posts')
    }
    catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err, __filename, Post.AddPost.name)
    }
}

export default Post