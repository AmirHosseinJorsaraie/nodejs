import { sequelize, DataTypes } from './DatabaseConnection.js'
import Post from "../Models/Post.js";
import { POST_LIST } from '../Constants/Server/default-data.js';
//Import here

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

//Insert Relationships Here

    ; (async () => {
        await sequelize.sync()
        var IsEmpty = await CheckEmpty()
        if (IsEmpty)
            await config()
        await Post.GetPosts()
    })()


async function config() {

    for (var i = 0; i < POST_LIST.length; i++) {
        await Post.AddPost(POST_LIST[i])
    }
}

async function CheckEmpty() {
    var posts = await Post.findAll()
    if (posts.length == 0) return true
    else return false
}

export default null