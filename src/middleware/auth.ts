import { NextFunction, Request, Response } from "express"
import catchAsync from "../utility/catchAsync"
import { Role } from "../../prisma/generated/prisma/enums";


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

        const verifiedToken = 

        next();
    })
}

export default auth;