import { validationResult } from "express-validator";
import { BAD_REQUEST } from "../Constants/responses.js";

function CheckValidation(req,res,next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(BAD_REQUEST.status).json({'Validation Errors' : errors.array()})
    }
    next()
}

export default CheckValidation