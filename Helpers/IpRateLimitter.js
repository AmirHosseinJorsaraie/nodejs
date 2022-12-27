const redisClient = require('./RedisClient')

function IpRateLimit(req, res, next) {

   // var ipExists = rateLimiter.find(r => r.ip == req.socket.remoteAddress)
    redisClient.get(req.socket.remoteAddress, async (error, Ip) => {

        if (error) console.log(error)
        if (!Ip) {
            currentIp = { tryCunts: 1}
            await redisClient.setEx(req.socket.remoteAddress, process.env.IP_EXPIRE_TIME, JSON.stringify(currentIp))
            return
        }

        let ip = JSON.parse(Ip)

        if (ip.tryCunts >= process.env.IP_RATE_LIMIT) {
            return res.json({message: 'you are blocked and you have to wait'})
        }

        ip.tryCunts = tryCunts + 1

        await redisClient.del(req.socket.remoteAddress)
        await redisClient.setEx(req.socket.remoteAddress, process.env.IP_EXPIRE_TIME, JSON.stringify(ip))
        next()
    })
    // var tryCunts = ipExists ? ipExists.tryCunts : 1

    // if (currentIp.tryCunts >= process.env.IP_RATE_LIMIT) {

    //     if (!ipExists.blocked) {
    //         IpBlackList(ipExists)
    //         ipExists.blocked = true
    //     }
    //     return res.status(400).json({ message: 'you cant try for 1 minute!' })
    // }

    // if (ipExists) {
    //     ipExists.tryCunts = tryCunts + 1
    //     return next()
    // }

    // rateLimiter.push({ ip: req.socket.remoteAddress, tryCunts: tryCunts, blocked: false })
}

async function IpBlackList(Ip) {
    setTimeout(() => {
        rateLimiter = rateLimiter.filter((item) => item.ip == Ip)
    }, 60000)
}

module.exports = IpRateLimit
