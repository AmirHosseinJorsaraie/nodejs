import JWT from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    const authToken = req.headers['authorization']
    const token = authToken && authToken.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    JWT.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}


export default authenticateToken