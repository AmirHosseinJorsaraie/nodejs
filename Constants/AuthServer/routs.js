import * as validators from "./validators.js"
import IpRateLimit from "../../Middlewares/IpRateLimitter.js"
import authenticateToken from "../../Middlewares/AuthenticateToken.js"
import CheckPermisions from "../../Middlewares/CheckPermisions.js"
import CheckValidation from "../../Middlewares/CheckValidation.js"
import CheckRoles from "../../Middlewares/CheckRoles.js"
import login from "../../Routs/AuthServer/login.js"
import logout from "../../Routs/AuthServer/logout.js"
import refresh from "../../Routs/AuthServer/refresh.js"
import register from "../../Routs/AuthServer/register.js"
import Add_Permision from "../../Routs/AuthServer/Permision/add.js"
import Add_Role from "../../Routs/AuthServer/Role/add.js"
import posts from "../../Routs/AuthServer/ServerProxyRouts/posts.js"
//Import rout

const ROUT_LIST = []

const LOGIN = Object.freeze({
    route: '/login',
    middlewares: [IpRateLimit, validators.LOGIN_VALIDATOR, CheckValidation],
    router: login
})
ROUT_LIST.push(LOGIN)

const LOGOUT = Object.freeze({
    route: '/logout',
    middlewares: [IpRateLimit, validators.LOGOUT_VALIDATOR, CheckValidation],
    router: logout
})
ROUT_LIST.push(LOGOUT)

const REFRESH = Object.freeze({
    route: '/refresh',
    middlewares: [IpRateLimit, validators.REFRESH_VALIDATOR, CheckValidation],
    router: refresh
})
ROUT_LIST.push(REFRESH)

const REGISTER = Object.freeze({
    route: '/register',
    middlewares: [IpRateLimit, validators.REGISTER_VALIDATOR, CheckValidation],
    router: register
})
ROUT_LIST.push(REGISTER)

const ADD_PERMISION = Object.freeze({
    route: '/Permision',
    middlewares: [IpRateLimit, validators.ADD_PERMISION_VALIDATOR, CheckValidation],
    router: Add_Permision
})
ROUT_LIST.push(ADD_PERMISION)

const ADD_ROLE = Object.freeze({
    route: '/Role',
    middlewares: [IpRateLimit, validators.ADD_ROLE_VALIDATOR, CheckValidation],
    router: Add_Role
})
ROUT_LIST.push(ADD_ROLE)

const POSTS = Object.freeze({
    route: '/posts',
    middlewares: [IpRateLimit, authenticateToken, CheckRoles, CheckPermisions],
    router: posts
})
ROUT_LIST.push(POSTS)

//Create rout

export default ROUT_LIST