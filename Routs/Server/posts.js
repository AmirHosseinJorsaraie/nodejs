const express = require('express')
const router = express.Router()
const IpRateLimit = require('../../Helpers/IpRateLimitter') 
const authenticateToken = require('../../Helpers/AuthenticateToken')
//get Roles from database
const RolesForThisRout = ['Admin', 'public']
//get permisions from database
const PermisionsForThisRout = ['watch posts']
const posts = [
    {
        username: 'AUK',
        title: 'Post 1'
    },
    {
        username: 'GIS',
        title: 'Post 2'
    }
]

router.get('/', IpRateLimit , authenticateToken, CheckRoles, CheckPermisions, (req, res) => {
    res
        .status(200)
        .append('Access-Control-Allow-Origin', ['*'])
        .json(posts)
})

function CheckRoles(req, res, next) {
    var userRoles = req.user.userRoles
    var veryfied = false;
    
    for (var i = 0; i < userRoles.length; i++) {
        for (var j = 0; j < RolesForThisRout.length; j++){
            if(userRoles[i].RoleName == RolesForThisRout[j]){
                veryfied = true;
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
                veryfied = true;
            }
        }
    }

    if(veryfied) next()
    else return res.status(402).json({message: 'You dont have permision for this action'})
}

module.exports = router
