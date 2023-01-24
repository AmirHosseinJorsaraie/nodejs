import IpRateLimit from "../../Middlewares/IpRateLimitter.js"
import RoutBlockMiddelware from "../../Middlewares/RoutBlockMiddleware.js"
import posts from "../../Routs/Server/posts.js"
//Import rout
const ROUT_LIST = []

const POST = {
    route: '/posts',
    middlewares: [ IpRateLimit, RoutBlockMiddelware],
    router: posts
}
ROUT_LIST.push(POST)

//Create rout 

export default ROUT_LIST