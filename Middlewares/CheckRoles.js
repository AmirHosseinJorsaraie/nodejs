import required_roles from "../Constants/AuthServer/required-roles-rout.js"

function CheckRoles(req, res, next) {
    const routeName = req.baseUrl
    const RolesForThisRout = GetRequierdRoles(routeName)

    if (!RolesForThisRout || RolesForThisRout.length == 0) {
        console.log('there is no requierd role for this route')
        res.status(500).json({ message: 'server error' })
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
    else return res.status(402).json({ message: 'Your role is not verified for this action' })
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