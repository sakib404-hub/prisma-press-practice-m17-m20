import { PostStatus } from "../../../prisma/generated/prisma/enums";

export interface ICreatePostPayLoad {
    title : string;
    content : string;
    thumbnail : string;
    isFeatured ? : boolean;
    status ? : PostStatus;
    tags : string[];
}