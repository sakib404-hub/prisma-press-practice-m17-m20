import { PayLoad } from "./user.interface";

const registerUserIntoDB = async(payLoad : PayLoad)=>{
    return payLoad;

}

const userServices = {
    registerUserIntoDB
}

export default userServices;