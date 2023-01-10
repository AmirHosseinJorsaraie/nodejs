import { Model } from '../Helpers/DatabaseConnection.js';
import redisClient from '../Helpers/RedisClient.js';

class Post extends Model { }

Post.GetPosts = async function () {
    let exists = await redisClient.exists('Posts')
  
    if (exists == 0) {
        await this.UpdatePostList()
    }

    let posts = await redisClient.SMEMBERS('Posts', 0, -1)
    posts.forEach((p, index) => {
        posts[index] = JSON.parse(p)
    })

    return posts
}

Post.UpdatePostList = async function () {
    let list = await Post.findAll()
    await redisClient.del('Posts')

    list.forEach((p) => {
        redisClient.SADD('Posts', JSON.stringify(p))
    })
}

Post.AddPost = async function (post) {
    await Post.create({ title: post.title, content: post.content})
    await this.UpdatePostList()
}

export default Post