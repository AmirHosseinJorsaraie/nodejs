require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const postsRout = require('./Routs/Server/posts')
const swaggerDocument = require('./swagger/ServerSwagger.json')
const swagger = require('swagger-ui-express')

app.use('/posts',postsRout)

app.use("/", swagger.serve, swagger.setup(swaggerDocument))
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))