import { prisma } from "../../lib/prisma"

const createCheckOutSession = async(userId : string)=>{

    const transactionResult = await prisma.$transaction(async(tx)=>{

        const user = await tx.user.findUnique({
            where : {
                id : userId
            },
            include : {
                subscription : true
            }
        })

        if(!userId){
            throw new Error("User does not Exists");
        }

        // let stripeCustomerId = user?.subscription 

    })

}

export const subscriptionServices = {
    createCheckOutSession
}