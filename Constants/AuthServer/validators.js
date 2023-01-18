import { body } from "express-validator"
import * as validator from "./validate-responses.js"

export const ADD_PERMISION_VALIDATOR = [
    body(validator.ADD_PERMISION_VALIDATOR_NOT_NULL.body).not().isEmpty().withMessage(validator.ADD_PERMISION_VALIDATOR_NOT_NULL)
]

export const ADD_ROLE_VALIDATOR = [
    body(validator.ADD_ROLE_VALIDATOR_NOT_NULL.body).not().isEmpty().withMessage(validator.ADD_ROLE_VALIDATOR_NOT_NULL.response),
    body(validator.ADD_ROLE_VALIDATOR_NOT_NULL_PERMISIONS.body).not().isEmpty().withMessage(validator.ADD_ROLE_VALIDATOR_NOT_NULL_PERMISIONS)
]

export const LOGIN_VALIDATOR = [
    body(validator.LOGIN_VALIDATOR_NOT_NULL.body).not().isEmpty().withMessage(validator.LOGIN_VALIDATOR_NOT_NULL.response),
    body(validator.LOGIN_VALIDATOR_IS_EMAIL.body).isEmail().withMessage(validator.LOGIN_VALIDATOR_IS_EMAIL.response),
    body(validator.LOGIN_VALIDATOR_PASSWORD_NOT_NULL.body).not().isEmpty().withMessage(validator.LOGIN_VALIDATOR_PASSWORD_NOT_NULL.response)
]

export const LOGOUT_VALIDATOR = [
    body(validator.LOGOUT_VALIDATOR_NOT_NULL.body).not().isEmpty().withMessage(validator.LOGOUT_VALIDATOR_NOT_NULL.response)
]

export const REFRESH_VALIDATOR = [
    body(validator.REFRESH_VALIDATOR_NOT_NULL.body).not().isEmpty().withMessage(validator.REFRESH_VALIDATOR_NOT_NULL.response)
]

export const REGISTER_VALIDATOR = [
    body(validator.REGISTER_VALIDATOR_USERNAME_NOT_NULL.body).not().isEmpty().withMessage(validator.REGISTER_VALIDATOR_USERNAME_NOT_NULL.response),
    body(validator.REGISTER_VALIDATOR_USERNAME_IS_EMAIL.body).isEmail().withMessage(validator.REGISTER_VALIDATOR_USERNAME_IS_EMAIL.response),
    body(validator.REGISTER_VALIDATOR_USERNAME_CHECK_LENGTH.body).isLength({ min: 3, max: 20 }).withMessage(validator.REGISTER_VALIDATOR_USERNAME_CHECK_LENGTH.response),
    body(validator.REGISTER_VALIDATOR_PASSWORD_NOT_NULL.body).not().isEmpty().withMessage(validator.REGISTER_VALIDATOR_PASSWORD_NOT_NULL),
    body(validator.REGISTER_VALIDATOR_PASSWORD_CHECK_LENGTH.body).isLength({ min: 5, max: 15 }).withMessage(validator.REGISTER_VALIDATOR_PASSWORD_CHECK_LENGTH.response),
    body(validator.REGISTER_VALIDATOR_ROLES_NOT_NULL.body).not().isEmpty().withMessage(validator.REGISTER_VALIDATOR_ROLES_NOT_NULL.response)
]
