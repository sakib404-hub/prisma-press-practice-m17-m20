import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import config from "../config/config";

const generateToken = (payLoad : JwtPayload, secret : string, expiresIn : SignOptions)=>{

    const token = jwt.sign(payLoad, secret, {expiresIn} as SignOptions);
    return token;
}

const verifyToken = (token : string) =>{
    try{

        const verifyToken = jwt.verify(token, config.jwt_secret);

        return {
            success : true,
            message : "Token verified successfully!",
            data : verifyToken
        }

    }catch(err){
        const errMessage = err instanceof Error ? err.message : "Something went wrong";
        return {
            success : false,
            errMessage
        }
    }
}

export const jwtUtility = {
    generateToken,
    verifyToken
}