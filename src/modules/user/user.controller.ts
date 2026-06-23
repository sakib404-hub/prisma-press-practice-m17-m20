import type { Request, Response } from "express";
import userServices from "./user.services";
import sendResponse from "../../utility/sendResponse";
import status from "http-status"


const getAllUser = async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Got All the User from the database Successfully",
        data: {
            name: "Md Sakib Hossen",
            email: 'sakib@gmail.com',
            age: 24
        }
    })
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