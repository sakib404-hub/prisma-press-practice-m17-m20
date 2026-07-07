import Stripe from "stripe";
import config from "../../config/config";
import { prisma } from "../../lib/prisma"
import stripe from "../../lib/stripe";
import { SubscriptionStatus } from "../../../prisma/generated/prisma/enums";
import { handleCheckOutSessionComplete } from "./subscription.utils";

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

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: config.stripe_product_price_id,
                    quantity: 1
                }
            ],
            mode: "subscription",
            //? who is paying
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            success_url: `${config.app_url}/premium?success=true`,
            cancel_url: `${config.app_url}/payment?success=false`,
            metadata: {
                userId: user?.id!
            }
        })

        return session.url;
    })

    return {
        paymentUrl: transactionResult
    }
}

const handleWebHook = async (payLoad: Buffer, signature: string) => {

    // creating the event as a valid object
    const event = stripe.webhooks.constructEvent(
        payLoad,
        signature,
        config.web_hook_secret
    );

    switch (event.type) {
        case 'checkout.session.completed':
            //? Occurs when a Checkout Session has been successfully completed.
            await handleCheckOutSessionComplete(event.data.object);


            break;
        case 'customer.subscription.updated':

        //? Occurs whenever a subscription changes (e.g., switching from one plan to another, or changing the status from trial to active).
            const paymentMethd = event.data.object;


            break;
        case 'customer.subscription.deleted':
            const paymentObject = event.data.object;
        //? Occurs whenever a customer’s subscription ends.
            break;
        default:
            // Unexpected event type
            console.log(`No event Matchhed -> event type ${event.type}.`);
            break;
    }
}

export const subscriptionServices = {
    createCheckOutSession,
    handleWebHook
}