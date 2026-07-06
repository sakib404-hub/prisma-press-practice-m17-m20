import { Router } from "express";
import { commentController } from "./comments.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();


//? posting a comment on a post
router.post('/',auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);

//? gettin comment based on author and authorId
router.get('/author/my-comments', auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.getAuthorComments );

//? getting single comment by id
router.get('/:commentId', commentController.getComment);

//? ggetting all the comments
router.get('/', commentController.getAllComments);

// deleting a comment 
router.delete('/:commentId',auth(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.deleteComment);

//? updating comments route
router.patch('/:commentId', auth(Role.ADMIN, Role.USER, Role.AUTHOR), commentController.updateComment)

export const commentRouter = router;