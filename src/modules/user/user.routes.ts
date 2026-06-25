import { Router } from "express";
import userController from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";


const router = Router();

router.post('/register', userController.registerUser);

router.get('/getAllUser', auth(Role.USER, Role.ADMIN, Role.AUTHOR), userController.getAllUser)

router.get('/me', auth(Role.USER, Role.ADMIN, Role.AUTHOR), userController.getMyProfile);

export const userRouter = router;