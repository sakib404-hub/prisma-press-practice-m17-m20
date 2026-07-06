import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utility/catchAsync"


const createComment = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

})


export const commentController = {
    createComment
}