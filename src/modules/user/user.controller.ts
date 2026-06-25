import type { NextFunction, Request, Response } from "express";
import userServices from "./user.services";
import status from "http-status"
import catchAsync from "../../utility/catchAsync";
import sendResponse2 from "../../utility/sendResponse2";




const getAllUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const users = await userServices.getAllUsersFromDB();

    return sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "User Information fetched successfully!",
        data : users
    })
})

const registerUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const payLoad = req.body;

    const user = await userServices.registerUserIntoDB(payLoad);

    return sendResponse2(res, {
        success : true,
        statusCode : status.CREATED,
        message : "User Registratation Successfull",
        data : user
    });
})

const getMyProfile = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const id = req.user?.id as string;

    const user = await userServices.getMyProfileFromDB(id);

    sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "User Information feteched SuccessFully!",
        data : user
    });
})



const userController = {
    getAllUser,
    registerUser,
    getMyProfile
}

export default userController;





// const registerUser = async (req: Request, res: Response) => {
//     try {
//         const payLoad = req.body;

//         const user = await userServices.registerUserIntoDB(payLoad);

//         return sendResponse(res, status.CREATED, true, "User Registratation Successfull", user);

//     } catch (err) {

//         console.error(err);

//         const errorMessage = err instanceof Error ? err.message : "Something went wrong";
//         return sendResponse(res, status.INTERNAL_SERVER_ERROR, false, errorMessage);

//     }
// }


// const getAllUser = async (req: Request, res: Response) => {
//    try{

//         const users = await userServices.getAllUsersFromDB();

//         return sendResponse(res, status.OK, true, "User Information fetched successfully", users);

//    }catch(err){
    
//     console.error(err);
//     const errorMessage = err instanceof Error ? err.message : "Something went wrong";
//     return sendResponse(res, status.INTERNAL_SERVER_ERROR, false, errorMessage);

//    }
// }