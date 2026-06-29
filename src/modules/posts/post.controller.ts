import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getPostStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

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