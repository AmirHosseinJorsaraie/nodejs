import redisClient from '../Helpers/RedisClient.js'
import { IP_BLOCKED } from '../Constants/responses.js'

async function IpRateLimit(req, res, next) {

    let Ip = await redisClient.get(req.socket.remoteAddress + req.baseUrl)

    if (!Ip) {
        let currentIp = { tryCunts: 1 }
        await redisClient.setEx(req.socket.remoteAddress + req.baseUrl, process.env.IP_EXPIRE_TIME, JSON.stringify(currentIp))
        return next()
    }

    let ip = JSON.parse(Ip)

    if (ip.tryCunts >= process.env.IP_RATE_LIMIT) {
        return res.status(IP_BLOCKED.status).json(IP_BLOCKED.message)
    }

    ip.tryCunts = ip.tryCunts + 1

    await redisClient.del(req.socket.remoteAddress + req.baseUrl)
    await redisClient.setEx(req.socket.remoteAddress + req.baseUrl, process.env.IP_EXPIRE_TIME, JSON.stringify(ip))
    next()

}

export default IpRateLimit
