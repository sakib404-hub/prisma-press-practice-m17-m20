import { prisma } from "../../lib/prisma";
import { IPayLoadComment } from "./comments.interface"

//? creating comment in the database
const createComment = async(payLoad : IPayLoadComment)=>{

    const postId = payLoad.postId;

    const transactionResult = await prisma.$transaction(async(tx)=>{
        const  post = await tx.post.findUnique({
            where : {
                id : postId
            }
        });

        // throwing an error if the post does not exists 
        if(!post){
            throw new Error("Post does not exists");
        }

        const createdComment = await tx.comment.create({
            data : {
                ...payLoad
            }
        })

        return createdComment;
    })

    return transactionResult;
}

const getAuthorComments = async(authorId : string)=>{
    const allComments = await prisma.comment.findMany({
        where : {
            authorId
        },
        include : {
            posts : {
                select : {
                    id : true,
                    title : true,
                    content : true,
                    thumbnail : true,
                }
            }
        }
    })

    return allComments;

}

export const commentServices = {
    createComment,
    getAuthorComments
} 