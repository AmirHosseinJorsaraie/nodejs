import JWT from 'jsonwebtoken'
import { AUTHORIZATION_HEADER, UNAUTHORIZED } from "../Constants/responses.js"

function authenticateToken(req, res, next) {
    const authToken = req.headers['authorization']
    const token = authToken && authToken.split(' ')[1]
    if (token == null) return res.status(AUTHORIZATION_HEADER.status).json(AUTHORIZATION_HEADER.message)

    JWT.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.status(UNAUTHORIZED.status).json(UNAUTHORIZED.message)

        req.user = user
        next()
    })
}


export default authenticateToken