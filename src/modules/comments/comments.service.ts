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

export const commentServices = {
    createComment,
    getAuthorComments,
    getComment
} 