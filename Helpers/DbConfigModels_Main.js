import { sequelize, DataTypes } from './DatabaseConnection.js'
import Post from "../Models/Post.js";


Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(2000),
        allowNull: true
    }
}, { sequelize, modelName: 'Post' })



    ; (async () => {
        await sequelize.sync()
        var IsEmpty = await CheckEmpty()
        if (IsEmpty)
            await config()
        await Post.GetPosts()
    })()


async function config() {

    for (var i = 0; i < 31; i++) {
        let post = {
            title: 'Post' + (i + 1),
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
        await Post.AddPost(post)
    }
}

async function CheckEmpty() {
    var posts = await Post.findAll()    
    if (posts.length == 0) return true
    else return false
}

export default null