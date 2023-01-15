import required_roles from "../Constants/AuthServer/required-roles-rout.js"
import { SERVER_ERROR,INATHENTIC_ROLE } from "../Constants/responses.js"
import eventEmitter from "../Helpers/GetEvents.js"

function CheckRoles(req, res, next) {
    const routeName = req.baseUrl
    const RolesForThisRout = GetRequierdRoles(routeName)

    if (!RolesForThisRout || RolesForThisRout.length == 0) {
        eventEmitter.emit('role.undefined')
        res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }

    var userRoles = req.user.userRoles
    var veryfied = false;
    for (var i = 0; i < userRoles.length; i++) {
        for (var j = 0; j < RolesForThisRout.length; j++) {
            if (userRoles[i].RoleName == RolesForThisRout[j]) {
                veryfied = true
            }
        }
    }

    if (veryfied) next()
    else return res.status(INATHENTIC_ROLE.status).json(INATHENTIC_ROLE.message)
}


function GetRequierdRoles(routeName) {
    let RoleList = []
    required_roles.forEach((r) => {
        if (r.route == routeName) {
            RoleList = r.roles
        }
    })
    return RoleList
}

export default CheckRoles