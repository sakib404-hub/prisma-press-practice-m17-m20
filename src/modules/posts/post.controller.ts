import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import userServices from "../user/user.services";
import { postServices } from "./post.service";
import sendResponse2 from "../../utility/sendResponse2";
import status from "http-status";

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await postServices.getAllPosts();

    return sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "Post Information fetched Successfully",
        data : result
    })

});

const getPostStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.id;

    const results = await postServices.getMyPosts(userId as string);

    return sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message :  "Posts retrive successfully",
        data : results
    })

});

const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});


//? creating the post
const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payLoad = req.body;
    const authorId = req.user?.id;
    console.log(authorId);

    const result = await postServices.createPost(payLoad , authorId as string);

    sendResponse2(res, {
        success : true,
        statusCode : status.CREATED,
        message : "Posted Successfully",
        data : result
    })

});

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

export const postController = {
    getAllPosts,
    getPostStats,
    getMyPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
};