import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import { LoginPayLoad } from "./auth.interface";
import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"

const loginUserInDB = async(payLoad : LoginPayLoad)=>{
    const {email, password} = payLoad;

    const isUserExist = await prisma.user.findUnique({
        where : {
            email
        },
    });

    //? checking if the user exist or not
    if(!isUserExist){
        throw new Error("User with this Email does not Exist");
    }

    //? checking if the user status is inactive or not
    if(isUserExist.activeStatus === "INACTIVE"){
        throw new Error("Your Account has been blocked, please contact support!");
    }

    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if(!isPasswordMatched){
        throw new Error("Incorrect Password");
    }

    const jwtPayLoad = {
        id : isUserExist.id,
        name : isUserExist.name,
        email : isUserExist.email,
        role : isUserExist.role
    }

    const accessToken = jwt.sign(jwtPayLoad, config.jwt_secret, { expiresIn : config.jwt_access_token_expiration } as SignOptions);

    return {
        accessToken
    }

}

const authServices = {
    loginUserInDB
}
export default authServices;