import required_permisions from "../Constants/AuthServer/required-permisions-rout.js"


function CheckPermisions(req, res, next) {
    const routeName = req.baseUrl
    const PermisionsForThisRout = GetRequierdPermisions(routeName)

    if (!PermisionsForThisRout || PermisionsForThisRout.length == 0) {
        console.log('there is no requierd permision for this route')
        res.status(500).json({ message: 'server error' })
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
    else return res.status(402).json({ message: 'You dont have permision for this action' })
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