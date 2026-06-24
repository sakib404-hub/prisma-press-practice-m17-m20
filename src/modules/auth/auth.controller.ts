import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";

const loginUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    
})

const authController = {
    loginUser
}

export default authController;