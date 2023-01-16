//succesfull responses
export const LOGOUT_SUCCESSFULL = Object.freeze({ status: 200, message: 'You logged out successfully.' })
export const LOGIN_SUCCESSFULL = Object.freeze({ status: 200, message: 'You logged in successfully.' })
export const ACCESS_TOKEN_REFRESHED_SUCCESSFULL = Object.freeze({status: 200, message: 'Refresh token has been refreshed successfully.'})
export const ADD_ROLE_SUCCESSFULL = Object.freeze({ status: 200, message: 'Role added successfully.' })
export const ADD_PERMISION_SUCCESSFULL = Object.freeze({ status: 200, message: 'Permision added successfully.' })
export const ADD_USER_SUCCESSFULL = Object.freeze({ status: 200, message: 'User added successfully.' })
export const GET_POSTS_SUCCESSFULL = Object.freeze({status: 200, message: 'Posts delivred successfully.'})
//failed responses
export const SERVER_ERROR = Object.freeze({ status: 500, message: 'Something went wrong.' })
export const USER_ERROR = Object.freeze({ status: 500, message: 'This user have problem. please contact support.'})
export const UNAUTHORIZED = Object.freeze({ status: 401, message: 'You are not athorized for this action.' })
export const BAD_REQUEST = Object.freeze({ status: 400, message: 'Your request is not valid.' })
export const AUTHORIZATION_HEADER = Object.freeze({ status: 400, message: 'Your authorization header is not valid.' })
export const INATHENTIC_PERMISION = Object.freeze({ status: 401, message: 'You dont have permision for this action.' })
export const INATHENTIC_ROLE = Object.freeze({ status: 401, message: 'Your role is not authorize for this action.' })
export const IP_BLOCKED = Object.freeze({ status: 403, message: `You are blocked and you have to wait for ${process.env.IP_EXPIRE_TIME} sec.` })
export const USER_UNVERIFIED = Object.freeze({ status: 401, message: 'Username or password is incorrect.' })
export const REFRESH_TOKEN_NOT_FOUND = Object.freeze({status: 404, message: 'refresh token not found!'})

//response headers
export const ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin'
export const CONTENT_TYPE = 'Content-Type'