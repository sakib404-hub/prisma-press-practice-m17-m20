import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"

const generateToken = (payLoad : JwtPayload, secret : string, expiresIn : SignOptions)=>{

    const token = jwt.sign(payLoad, secret, {expiresIn} as SignOptions);
    return token;
}

export const jwtUtility = {
    generateToken
}