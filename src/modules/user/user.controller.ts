import type { Request, Response } from "express";
import userServices from "./user.services";
import sendResponse from "../../utility/sendResponse";
import status from "http-status"


const getAllUser = async (req: Request, res: Response) => {
   try{

        const users = await userServices.getAllUsersFromDB();

        return sendResponse(res, status.OK, true, "User Information fetched successfully", users);

   }catch(err){
    
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return sendResponse(res, status.INTERNAL_SERVER_ERROR, false, errorMessage);

   }
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const payLoad = req.body;

        const user = await userServices.registerUserIntoDB(payLoad);

        return sendResponse(res, status.CREATED, true, "User Registratation Successfull", user);

    } catch (err) {

        console.error(err);

        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        return sendResponse(res, status.INTERNAL_SERVER_ERROR, false, errorMessage);

    }
}



const userController = {
    getAllUser,
    registerUser
}

export default userController;