import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { SubscriptionStatus } from "../../../prisma/generated/prisma/enums";
import stripe from "../../lib/stripe";

export const handleCheckOutSessionComplete = async (session: Stripe.Checkout.Session) => {

    const userId = session.metadata?.userId;

    //? finding the customer id of the session
    const stripeCustomerId = session.customer as string;

    const stripeSubscritionId = session.subscription as string;

    if (!userId || !stripeCustomerId || !stripeSubscritionId) {
        throw new Error("Web Hook Failed!");
    }

    const stripeSubscrition = await stripe.subscriptions.retrieve(stripeSubscritionId as string);

    console.log(stripeSubscrition.items.data[0]);

    //? const currentPeriodStarts = stripeSubscrition.items.data[0]?.current_period_start;


    const current_period_end = getPeriodEnd(stripeSubscrition)

    await prisma.subscription.upsert({
        where: {
            userId
        },
        create: {
            userId,
            stripe_subscription_id: stripeSubscritionId,
            stripe_customer_id: stripeCustomerId,
            status: SubscriptionStatus.ACTIVE,
            current_period_end
        },
        update: {
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscritionId,
            status: SubscriptionStatus.ACTIVE,
            current_period_end

        }
    })
}


const getPeriodEnd = (payLoad: Stripe.Subscription) => {
    const currentPeriodEndsInMiliSeconds = payLoad.items.data[0]?.current_period_end!;

    const currentPeriodEns = new Date(currentPeriodEndsInMiliSeconds * 1000);
    return currentPeriodEns;
}