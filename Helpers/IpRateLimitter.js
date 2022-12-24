var rateLimiter = []

function IpRateLimit(req, res, next) {

    var ipExists = rateLimiter.find(r => r.ip == req.socket.remoteAddress)
    console.log(ipExists)
    var tryCunts = ipExists ? ipExists.tryCunts : 1

    if (tryCunts > 5) return res.status(400).json({ message: 'you cant try for 5 min later!' })
    
    if (ipExists) {
        ipExists.tryCunts++
        return next()
    }
    rateLimiter.push({ ip: req.socket.remoteAddress, tryCunts: tryCunts })
    next()
}

module.exports = IpRateLimit