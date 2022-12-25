var rateLimiter = []

function IpRateLimit(req, res, next) {

    var ipExists = rateLimiter.find(r => r.ip == req.socket.remoteAddress)

    var tryCunts = ipExists ? ipExists.tryCunts : 1
    
    if (tryCunts >= process.env.IpRateLimit) {

        if (!ipExists.blocked) {
            IpBlackList(ipExists)
            ipExists.blocked = true
        }
        return res.status(400).json({ message: 'you cant try for 1 minute!' })
    }

    if (ipExists) {
        ipExists.tryCunts = tryCunts + 1
        return next()
    }

    rateLimiter.push({ ip: req.socket.remoteAddress, tryCunts: tryCunts, blocked: false })
    next()
}

async function IpBlackList(Ip) {
    setTimeout(() => {
        rateLimiter = rateLimiter.filter((item) => item.ip == Ip)
    }, 60000)
}

module.exports = IpRateLimit
