import { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

//? getting all the posts this will be public access
router.get("/", postController.getAllPosts);

router.get(
    "/stats",
    auth("ADMIN"),
    postController.getPostStats
);

router.get(
    "/my-posts",
    auth(Role.AUTHOR, Role.ADMIN, Role.USER),
    postController.getMyPosts
);

router.get(
    "/:postId",
    postController.getSinglePost
);

//? creating a post admin or the logged in user 
router.post(
    "/",
    auth(Role.ADMIN, Role.USER),
    postController.createPost
);

router.patch(
    "/:postId",
    auth("USER", "ADMIN"),
    postController.updatePost
);

router.delete(
    "/:postId",
    auth("USER", "ADMIN"),
    postController.deletePost
);

export const postRouter = router;