import { Router } from "express";
import { commentController } from "./comments.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();


//? posting a comment on a post
router.post('/',auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);

export const commentRouter = router;