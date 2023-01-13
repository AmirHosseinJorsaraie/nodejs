//succesfull responses
const LOGOUT_SUCCESSFULL = Object.freeze({ status: 200, message: 'You logged out successfully.' })
const LOGIN_SUCCESSFULL = Object.freeze({ status: 200, message: 'You logged in successfully.' })
const ADD_ROLE_SUCCESSFULL = Object.freeze({ status: 200, message: 'Role added successfully.' })
const ADD_PERMISION_SUCCESSFULL = Object.freeze({ status: 200, message: 'Permision added successfully.' })
const ADD_USER_SUCCESSFULL = Object.freeze({ status: 200, message: 'User added successfully.' })
//failed responses
const SERVER_ERROR = Object.freeze({ status: 500, message: 'Something went wrong.' })
const UNAUTHORIZED = Object.freeze({ status: 401, message: 'You are not athorized for this action.' })
const BAD_REQUEST = Object.freeze({ status: 400, message: 'Your request is not valid.' })
const INATHENTIC_PERMISION = Object.freeze({ status: 401, message: 'You dont have permision for this action.' })
const INATHENTIC_ROLE = Object.freeze({ status: 401, message: 'Your role is not authorize for this action.' })
