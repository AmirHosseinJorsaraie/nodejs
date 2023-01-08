import { Router } from 'express'
const router = Router()
import { createProxyMiddleware } from 'http-proxy-middleware'
import authenticateToken from '../../../Helpers/AuthenticateToken.js'
import IpRateLimit from '../../../Helpers/IpRateLimitter.js'
//get Roles from database
const RolesForThisRout = ['Admin', 'public']
//get permisions from database
const PermisionsForThisRout = ['Create Posts']

router.get('/',IpRateLimit,authenticateToken,CheckRoles,CheckPermisions,createProxyMiddleware({
    target:'http://localhost:3000'
}))



function CheckRoles(req, res, next) {
    var userRoles = req.user.userRoles
    var veryfied = false;
    for (var i = 0; i < userRoles.length; i++) {
        for (var j = 0; j < RolesForThisRout.length; j++){
            if(userRoles[i].RoleName == RolesForThisRout[j]){
                veryfied = true
            }
        }
    }

    if(veryfied) next()
    else return res.status(402).json({message: 'You are not verified for this action'})
}

function CheckPermisions(req, res, next) {
    var userPermisions = req.user.userPermisions
    var veryfied = false;
   
    for (var i = 0; i < userPermisions.length; i++) {
        for (var j = 0; j < RolesForThisRout.length; j++){
            if(userPermisions[i].PermisionName == PermisionsForThisRout[j]){
                veryfied = true
            }
        }
    }

    if(veryfied) next()
    else return res.status(402).json({message: 'You dont have permision for this action'})
}



export default router