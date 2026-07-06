import { prisma } from "../../lib/prisma";
import { IPayLoadComment, IUpdateComments } from "./comments.interface"

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

//? updating comment
const updateComments = async(payLoad : IUpdateComments, commentId : string, authorId : string, isAdmin : boolean)=>{

    const comment = await prisma.comment.findUnique({
        where : {
            id : commentId
        }
    })

    if(!comment){
        throw new Error("Comment does not exists!");
    }

    if(!isAdmin && comment.authorId !== authorId){
        throw new Error("You don't have the permission to update this comment!");
    }

    const updatedComment = await prisma.comment.update({
        where : {
            id : commentId
        },
        data : {
            ...payLoad
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

    return updatedComment;
}



export const commentServices = {
    createComment,
    getAuthorComments,
    getComment,
    getAllComments,
    deleteComment,
    updateComments
} 