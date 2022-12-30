const redisClient = require('./RedisClient')

async function IpRateLimit(req, res, next) {

    var Ip = await redisClient.get(req.socket.remoteAddress)

        if (!Ip) {
            currentIp = { tryCunts: 1}
            await redisClient.setEx(req.socket.remoteAddress, process.env.IP_EXPIRE_TIME, JSON.stringify(currentIp))
            return next()
        }

        let ip = JSON.parse(Ip)
     
        if (ip.tryCunts >= process.env.IP_RATE_LIMIT) {
            return res.json({message: 'you are blocked and you have to wait'})
        }

        ip.tryCunts = ip.tryCunts + 1

        await redisClient.del(req.socket.remoteAddress)
        await redisClient.setEx(req.socket.remoteAddress, process.env.IP_EXPIRE_TIME, JSON.stringify(ip))
        next()

    
}


module.exports = IpRateLimit
