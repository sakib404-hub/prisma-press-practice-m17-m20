import { CommentStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreatePostPayLoad } from "./post.interface";

const getAllPosts = async () => {
    const result = await prisma.post.findMany({
        orderBy : {
            createdAt : "desc"
        },
        include : {
            comment : true,
            author : {
                select : {
                    id : true,
                    name : true,
                    email : true
                }
            }
        }
    })

    return result;
};

const getPostStats = async () => {

};

const getMyPosts = async (userId : string) => {

    const data = await prisma.post.findMany({
        where : {
            authorId : userId
        },
        
    })
    return data;

};

const getSinglePost = async (postId : string) => {

    const transactionResult = await prisma.$transaction(async(tx)=>{
        await tx.post.update({
            where : {
                id : postId
            },
            data : {
                views : {
                    increment : 1
                }
            }
        });

        const post = await tx.post.findUnique({
            where : {
                id : postId
            },
            include : {
                author : {
                    omit : {
                        password : true
                    }
                },
                comment : {
                    where : {
                        status : CommentStatus.APPROVED
                    },
                    orderBy : {
                        createdAt : "desc"
                    }
                },
                _count : {
                    select : {
                        comment : true
                    }
                }
            }
        })

         return post;
    })

    return transactionResult;

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