import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utility/catchAsync"
import { commentServices } from "./comments.service";
import sendResponse2 from "../../utility/sendResponse2";
import status from "http-status";
import { Role } from "../../../prisma/generated/prisma/enums";


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

const getAllComments = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const result = await commentServices.getAllComments();

    return sendResponse2(res, {
        success : true, 
        statusCode : status.OK,
        message : "Comment fetched successfully",
        data : result
    })
})


const deleteComment = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const commentId = req.params.commentId;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === Role.ADMIN ? true : false;

    console.log(isAdmin);

    await commentServices.deleteComment(commentId as string, authorId as string, isAdmin);

    return sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "Comment deleted successfully!"
    })
})

export const commentController = {
    createComment,
    getAuthorComments,
    getComment,
    getAllComments,
    deleteComment
}