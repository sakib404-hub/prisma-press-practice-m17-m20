import { NextFunction, Request, Response } from "express"
import catchAsync from "../utility/catchAsync"
import { Role } from "../../prisma/generated/prisma/enums";
import { jwtUtility } from "../utility/jwt";
import { JwtPayload } from "jsonwebtoken";
import sendResponse2 from "../utility/sendResponse2";
import status from "http-status";
import { prisma } from "../lib/prisma";


declare global {
    namespace Express {
        interface Request {
            user ? : {
                id : string;
                name : string;
                email : string;
                role : string;
            }
        }
    }
}


const auth  = (...requiredRoles : Role[])=>{
    return catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

        const token = req.cookies.accessToken ?  
        req.cookies.accessToken : 
        req.headers.authorization?.startsWith('Bearer') ? 
        req.headers.authorization.split(" ")[1] : 
        req.headers.authorization;

        if(!token){
            throw new Error("You are not logged in , kindly login first!");
        }

        //? verifying the token
        const verifiedToken = jwtUtility.verifyToken(token);

        if(!verifiedToken.success){
            throw new Error(verifiedToken.errMessage);
        }

        const {id, name, email, role} = verifiedToken.data as JwtPayload;
       

        if(requiredRoles && !requiredRoles.includes(role)){
            sendResponse2(res, {
                success : false,
                statusCode : status.FORBIDDEN,
                message : "Forbidden access, you do not have the permission to access this"
            })
        }

        const user = await prisma.user.findUnique({
            where : {
                email,
                id
            },
            omit : {
                password : true
            }
        })

        if(!user){
            throw new Error("User does not Exist!");
        }

        req.user = {
            id,
            name,
            email,
            role
        }

        next();
    })
}

export default auth;