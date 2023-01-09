import redisClient from './RedisClient.js'

async function IpRateLimit(req, res, next) {
    let Ip = await redisClient.get(req.socket.remoteAddress + req.baseUrl)

    if (!Ip) {
        let currentIp = { tryCunts: 1 }
        await redisClient.setEx(req.socket.remoteAddress + req.baseUrl, process.env.IP_EXPIRE_TIME, JSON.stringify(currentIp))
        return next()
    }

    let ip = JSON.parse(Ip)

    if (ip.tryCunts >= process.env.IP_RATE_LIMIT) {
        return res.json({ message: `you are blocked and you have to wait for ${process.env.IP_EXPIRE_TIME} sec` })
    }

    ip.tryCunts = ip.tryCunts + 1

    await redisClient.del(req.socket.remoteAddress + req.baseUrl)
    await redisClient.setEx(req.socket.remoteAddress + req.baseUrl, process.env.IP_EXPIRE_TIME, JSON.stringify(ip))
    next()

}

export default IpRateLimit
