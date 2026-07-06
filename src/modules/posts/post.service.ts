import { CommentStatus, PostStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreatePostPayLoad, IUpdatePost } from "./post.interface";

const getAllPosts = async () => {
    const result = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comment: {
                select : {
                    id : true,
                    content : true,
                    status : true
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return result;
};

const getPostStats = async () => {
    const transactionResult = await prisma.$transaction(async (tx) => {

        const [
            totalPosts,
            publishedPosts,
            draftPosts,
            archivedPosts,
            totalComments,
            approvedComments,
            rejectedComments,
            totalViews,
        ] = await Promise.all([
            await tx.post.count(),

            await tx.post.count({
                where: {
                    status: PostStatus.PUBLISHED
                }
            }),

            await tx.post.count({
                where: {
                    status: PostStatus.ARCHIVED
                }
            }),

            await tx.post.count({
                where: {
                    status: PostStatus.ARCHIVED
                }
            }),

            await tx.comment.count(),

            await tx.comment.count({
                where: {
                    status: CommentStatus.APPROVED
                }
            }),
            await tx.comment.count({
                where: {
                    status: CommentStatus.REJECT
                }
            }),
            await tx.post.aggregate({
                _sum: {
                    views: true
                }
            })

        ]);

        return {
            totalPosts,
            publishedPosts,
            draftPosts,
            archivedPosts,
            totalComments,
            approvedComments,
            rejectedComments,
            totalViews,
        }
    })

    return transactionResult;

};

const getMyPosts = async (userId: string) => {

    const data = await prisma.post.findMany({
        where: {
            authorId: userId
        },

    })
    return data;

};

const getSinglePost = async (postId: string) => {

    const transactionResult = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: {
                id: postId
            },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        const post = await tx.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: {
                    omit: {
                        password: true
                    }
                },
                comment: {
                    where: {
                        status: CommentStatus.APPROVED
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                _count: {
                    select: {
                        comment: true
                    }
                }
            }
        })

        return post;
    })

    return transactionResult;

};

const createPost = async (payLoad: ICreatePostPayLoad, authorId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payLoad,
            authorId
        }
    })
    return result;
};

const updatePost = async (payLoad: IUpdatePost, postId: string, authorId: string, isAdmin: Boolean) => {
    const transactionResult = await prisma.$transaction(async (tx) => {

        const post = await tx.post.findUnique({
            where: {
                id: postId,
                authorId
            },
            include: {
                author: {
                    omit: {
                        password: true
                    }
                },
                _count: {
                    select: {
                        comment: true
                    }
                }
            }
        });

        if (!post) {
            throw new Error("Post Does not exists");
        }

        if (!isAdmin && post.authorId !== authorId) {
            throw new Error("You are neither the admin or the author of this post , you can not update it!");
        }

        const updatedPost = await tx.post.update({
            where: {
                id: postId
            },
            data: {
                ...payLoad
            },
            include: {
                author: {
                    omit: {
                        password: true
                    }
                }
            }
        })

        return updatedPost;
    })

    return transactionResult;

};

const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {

    await prisma.$transaction(async (tx) => {
        const post = await tx.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error("Post does not exists!");
        }

        if (!isAdmin && post.authorId !== authorId) {
            throw ("You are not the admin, or the author of this post you can not delete this post");
        }

        await tx.post.delete({
            where: {
                id: postId
            }
        })
    })

    return null;

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