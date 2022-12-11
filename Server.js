require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const postsRout = require('./Routs/Server/posts')


app.use('/posts',postsRout)


app.listen(PORT, () => console.log(`server listening on port ${PORT}`))