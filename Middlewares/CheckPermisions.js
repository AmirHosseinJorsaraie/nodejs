import required_permisions from "../Constants/AuthServer/required-permisions-rout.js"
import { SERVER_ERROR,INATHENTIC_PERMISION } from "../Constants/responses.js"
import eventEmitter from "../Helpers/GetEvents.js"

function CheckPermisions(req, res, next) {
    const routeName = req.baseUrl
    const PermisionsForThisRout = GetRequierdPermisions(routeName)

    if (!PermisionsForThisRout || PermisionsForThisRout.length == 0) {
        eventEmitter.emit('permision.undefined')
        res.status(SERVER_ERROR.status).json(SERVER_ERROR.message)
    }

    var userPermisions = req.user.userPermisions
    var veryfied = false;

    for (var i = 0; i < userPermisions.length; i++) {
        for (var j = 0; j < PermisionsForThisRout.length; j++) {
            if (userPermisions[i].PermisionName == PermisionsForThisRout[j]) {
                veryfied = true
            }
        }
    }

    if (veryfied) next()
    else return res.status(INATHENTIC_PERMISION.status).json(INATHENTIC_PERMISION.message)
}

function GetRequierdPermisions(routeName) {
    let PermisionList = []
    required_permisions.forEach((r) => {
        if (r.route == routeName) {
            PermisionList = r.permisions
        }
    })
    return PermisionList
}

export default CheckPermisions