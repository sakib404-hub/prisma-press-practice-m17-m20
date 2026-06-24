import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import userServices from "../user/user.services";
import authServices from "./auth.service";
import sendResponse2 from "../../utility/sendResponse2";
import status from "http-status";

const loginUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const payLoad = req.body;
    const user = await authServices.loginUserInDB(payLoad);

    sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "User Logged In Successfully!",
        data : user
    })
})

const authController = {
    loginUser
}

export default authController;