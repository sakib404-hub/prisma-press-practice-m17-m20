import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utility/catchAsync"
import { commentServices } from "./comments.service";
import sendResponse2 from "../../utility/sendResponse2";
import status from "http-status";


const createComment = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

    const userId = req.user?.id;
    const payLoad = req.body;

    if(!payLoad.authorId){
        payLoad.authorId = userId;
    }

    const result = await commentServices.createComment(payLoad);

    return sendResponse2(res, {
        success : true,
        statusCode : status.CREATED,
        message : "Comment created successfully",
        data : result
    })

})


export const commentController = {
    createComment
}