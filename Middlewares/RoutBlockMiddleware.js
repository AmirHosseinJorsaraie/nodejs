function RoutBlockMiddelware(req, res, next) {
    if (req.headers.host == process.env.AUTH_SERVER_HOST)
        next()
    else {
        res.sendStatus(401)
    }
}

export default RoutBlockMiddelware