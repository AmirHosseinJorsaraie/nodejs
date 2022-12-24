require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const eventEmitter = require('./Helpers/GetEvents')
const postsRout = require('./Routs/Server/posts')
const swaggerDocument = require('./swagger/ServerSwagger.json')
const swagger = require('swagger-ui-express')

app.use('/posts',postsRout)

app.use("/api-doc", swagger.serve, swagger.setup(swaggerDocument))
app.listen(PORT, () => eventEmitter.emit('server.start',PORT))
