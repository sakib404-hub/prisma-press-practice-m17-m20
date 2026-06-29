import { prisma } from "../../lib/prisma";
import { ICreatePostPayLoad } from "./post.interface";

const getAllPosts = async () => {

};

const getPostStats = async () => {

};

const getMyPosts = async () => {

};

const getSinglePost = async (postId: string) => {

};

const createPost = async (payLoad : ICreatePostPayLoad, authorId : string) => {
    const result = await prisma.post.create({
        data : {
            ...payLoad,
            authorId
        }
    })
    return result;
};

const updatePost = async (postId: string) => {

};

const deletePost = async (postId: string) => {

};

export const postServices = {
    getAllPosts,
    getPostStats,
    getMyPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
};