import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { subscriptionServices } from "./subscription.service";
import sendResponse2 from "../../utility/sendResponse2";
import status from "http-status";

const createCheckOutSession = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

    const userId = req.user?.id;

    const result = await subscriptionServices.createCheckOutSession(userId as string);

    return sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "CheckOut completed successfully",
        data : result
    })

})

const handleWebHook = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

    const event = req.body as Buffer;

    const signature = req.headers['stripe-signature'];

    const result = subscriptionServices.handleWebHook(event , signature as string);

    sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "Web Hook triggered successfully!",
        data : result
    })

})

export const subscriptionController = {
    createCheckOutSession,
    handleWebHook
}
