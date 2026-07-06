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

const getAuthorComments = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const authorId = req.user?.id;

    const result = await commentServices.getAuthorComments(authorId as string);

    return sendResponse2(res, {
        success : true, 
        statusCode : status.OK,
        message : "Author comment fetched successfully",
        data : result
    })
})

const getComment = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const commentId = req.params.commentId;

    const result = await commentServices.getComment(commentId as string);

    return sendResponse2(res, {
        success : true, 
        statusCode : status.OK,
        message : "Comment fetched successfully",
        data : result
    })
})


export const commentController = {
    createComment,
    getAuthorComments,
    getComment
}