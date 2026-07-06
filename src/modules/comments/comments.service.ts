import { prisma } from "../../lib/prisma";
import { IPayLoadComment } from "./comments.interface"

//? creating comment in the database
const createComment = async (payLoad: IPayLoadComment) => {

    const postId = payLoad.postId;

    const transactionResult = await prisma.$transaction(async (tx) => {
        const post = await tx.post.findUnique({
            where: {
                id: postId
            }
        });

        // throwing an error if the post does not exists 
        if (!post) {
            throw new Error("Post does not exists");
        }

        const createdComment = await tx.comment.create({
            data: {
                ...payLoad
            }
        })

        return createdComment;
    })

    return transactionResult;
}

//? getting logged in users comments
const getAuthorComments = async (authorId: string) => {
    const allComments = await prisma.comment.findMany({
        where: {
            authorId
        },
        include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    thumbnail: true,
                }
            }
        }
    })

    return allComments;

}

//? 
const getComment = async (commentId: string)=>{
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        },
         include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    thumbnail: true,
                }
            }
        }
    })

    if(!comment){
        throw new Error("Comment does not exists!");
    }
    return comment;
}

//? getting all the comments
const getAllComments = async()=>{
    const result = await prisma.comment.findMany({
         include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    thumbnail: true,
                }
            }
        },
        omit : {
            id : true
        }
    });

    return result;
}

//? deleting a comment

const deleteComment = async(commentId : string, authorId : string, isAdmin : boolean)=>{

    await prisma.$transaction(async(tx)=>{
        
        const comment = await tx.comment.findUnique({
            where : {
                id : commentId
            }
        })

        if(!comment){
            throw new Error("Comment does not exist");
        }

        if(comment.authorId !== authorId && !isAdmin){
            throw new Error("You are not allowed to delete this comment.");
        }

        await tx.comment.delete({
            where : {
                id : commentId
            }
        })
    })
}

export const commentServices = {
    createComment,
    getAuthorComments,
    getComment,
    getAllComments,
    deleteComment
} 