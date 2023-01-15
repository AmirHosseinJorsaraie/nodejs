import { UNAUTHORIZED } from "../Constants/responses.js"

function RoutBlockMiddelware(req, res, next) {
    if (req.headers.host == process.env.AUTH_SERVER_HOST)
        next()
    else {
        res.status(UNAUTHORIZED.status).json(UNAUTHORIZED.message)
    }
}

export default RoutBlockMiddelware