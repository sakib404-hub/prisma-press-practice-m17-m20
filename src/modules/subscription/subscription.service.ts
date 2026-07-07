import { prisma } from "../../lib/prisma"
import stripe from "../../lib/stripe";

const createCheckOutSession = async (userId: string) => {

    const transactionResult = await prisma.$transaction(async (tx) => {

        const user = await tx.user.findUnique({
            where: {
                id: userId
            },
            include: {
                subscription: true
            }
        })

        if (!userId) {
            throw new Error("User does not Exists");
        }

        //? getting the stripe customer id if exist , if not therefore creatingg stripe customer id
        //? for old subscriber
        let stripeCustomerId = user?.subscription?.stripe_customer_id;

        if (!stripeCustomerId) {
            //? for the new subscriber
            let customer = await stripe.customers.create({
                email: user?.email,
                name: user?.name,
                metadata: {
                    userId: user?.id!
                }
            });

            stripeCustomerId = customer.id;
        }

    })

}

export const subscriptionServices = {
    createCheckOutSession
}