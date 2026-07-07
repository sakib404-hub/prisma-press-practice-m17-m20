import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post('/checkout',auth(Role.ADMIN, Role.AUTHOR, Role.USER),
 subscriptionController.createCheckOutSession);


router.post('/webhook', subscriptionController.handleWebHook);

router.get('/subscription-status',auth(Role.ADMIN, Role.AUTHOR, Role.USER), subscriptionController.getSubscriptionStatus)

// router.post('/webhook', ()=>{})

export const subscriptionRouter = router