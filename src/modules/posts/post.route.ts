import { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";

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
    auth("USER", "ADMIN"),
    postController.getMyPosts
);

router.get(
    "/:postId",
    postController.getSinglePost
);

router.post(
    "/",
    auth("USER", "ADMIN"),
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