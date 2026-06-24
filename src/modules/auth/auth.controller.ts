import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import authServices from "./auth.service";
import sendResponse2 from "../../utility/sendResponse2";
import status from "http-status";

const loginUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const payLoad = req.body;
    const {accessToken, refreshToken} = await authServices.loginUserInDB(payLoad);


    //? setting the access token into the cookies
    res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 
    })


    //? setting the refresh token into the cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 7 
    })

    sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "User Logged In Successfully!",
        data : {
            accessToken,
            refreshToken
        }
    })
})

const authController = {
    loginUser
}

export default authController;