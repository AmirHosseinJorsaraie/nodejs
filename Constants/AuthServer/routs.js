import IpRateLimit from "../../Middlewares/IpRateLimitter.js"
import authenticateToken from "../../Middlewares/AuthenticateToken.js"
import CheckPermisions from "../../Middlewares/CheckPermisions.js"
import CheckRoles from "../../Middlewares/CheckRoles.js"
import login from "../../Routs/AuthServer/login.js"
import logout from "../../Routs/AuthServer/logout.js"
import refresh from "../../Routs/AuthServer/refresh.js"
import register from "../../Routs/AuthServer/register.js"
import Add_Permision from "../../Routs/AuthServer/Permision/add.js"
import Add_Role from "../../Routs/AuthServer/Role/add.js"
import posts from "../../Routs/AuthServer/ServerProxyRouts/posts.js"

const LOGIN = Object.freeze({
    route: '/login',
    middlewares: [IpRateLimit],
    router: login
})

const LOGOUT = Object.freeze({
    route: '/logout',
    middlewares: [IpRateLimit],
    router: logout
})

const REFRESH = Object.freeze({
    route: '/refresh',
    middlewares: [IpRateLimit],
    router: refresh
})

const REGISTER = Object.freeze({
    route: '/register',
    middlewares: [IpRateLimit],
    router: register
})

const ADD_PERMISION = Object.freeze({
    route: '/Permision',
    middlewares: [IpRateLimit],
    router: Add_Permision
})

const ADD_ROLE = Object.freeze({
    route: '/Role',
    middlewares: [IpRateLimit],
    router: Add_Role 
})

const POSTS = Object.freeze({
    route:'/posts',
    middlewares: [IpRateLimit,authenticateToken,CheckRoles,CheckPermisions],
    router: posts
})


export default [LOGIN,LOGOUT,REFRESH,REGISTER,ADD_PERMISION,ADD_ROLE,POSTS]