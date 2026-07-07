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
        console.log("Missing values fore creating checkout session");
        return;
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

export const handleChangeSubscription = async(payLoad : Stripe.Subscription)=>{

    const stripe_subscription_id = payLoad.id;
    let status;

    //? getting the subscription status from stripe
    if(payLoad.status === 'active' || payLoad.status === 'trialing'){
        status = SubscriptionStatus.ACTIVE
    }else if(payLoad.status === "canceled"){
        status = SubscriptionStatus.CANCELLED
    }else{
        status = SubscriptionStatus.EXPIRED
    }

    const current_period_end = getPeriodEnd(payLoad);

    const isSubscriptionExist = await prisma.subscription.findUnique({
        where: {
            id : stripe_subscription_id
        }
    })

    if(!isSubscriptionExist){
        console.log(`WebHook : Subscription does not  exits! with id -> ${stripe_subscription_id}`)
        return ;
    }

    await prisma.subscription.update({
        where : {
            stripe_subscription_id
        },
        data : {
            status,
            current_period_end
        }
    })


}


const getPeriodEnd = (payLoad: Stripe.Subscription) => {
    const currentPeriodEndsInMiliSeconds = payLoad.items.data[0]?.current_period_end!;

    const currentPeriodEns = new Date(currentPeriodEndsInMiliSeconds * 1000);
    return currentPeriodEns;
}