import { Router } from "express";
import userController from "./user.controller";


const router = Router();

router.get('/getall', userController.getAllUser);

export const userRouter = router;