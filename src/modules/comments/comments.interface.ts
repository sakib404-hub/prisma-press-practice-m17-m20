import { CommentStatus } from "../../../prisma/generated/prisma/enums";

export interface IPayLoadComment {
    postId : string;
    content : string;
    authorId : string;
    status : CommentStatus
}