import { prisma } from "../../lib/prisma";
import { PayLoad } from "./user.interface";

const registerUserIntoDB = async(payLoad : PayLoad)=>{

    const {name, email, password, profilePhoto} = payLoad;

    const isUserExist = await prisma.user.findUnique({
        where : {
            email
        }
    })

    //? throwing an error if user exist with same email
    if(isUserExist){
        throw new Error("User with this email already exist!");
    }



    
    return payLoad;

}

const userServices = {
    registerUserIntoDB
}

export default userServices;