import IpRateLimit from "../../Middlewares/IpRateLimitter.js"
import RoutBlockMiddelware from "../../Middlewares/RoutBlockMiddleware.js"
import posts from "../../Routs/Server/posts.js"

const POST = {
    route: '/posts',
    middlewares: [ IpRateLimit, RoutBlockMiddelware],
    router: posts
}

export default [POST]