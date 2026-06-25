import { Router } from "express";
import userController from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";


const router = Router();

router.post('/register', userController.registerUser);

router.get('/getAllUser', userController.getAllUser)

router.get('/me', auth(Role.USER, Role.ADMIN, Role.AUTHOR), userController.getMyProfile);

router.put('/my-profile', auth(Role.USER, Role.ADMIN),userController.updateProrile);

export const userRouter = router;