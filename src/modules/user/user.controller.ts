import type { Request, Response } from "express";


const getAllUser = async(req : Request, res : Response)=>{
    res.status(200).json({
        success : true,
        message : "Got All the User from the database Successfully",
        data : {
            name : "Md Sakib Hossen",
            email : 'sakib@gmail.com',
            age : 24
        }
    })
}



const userController = {
    getAllUser
}

export default userController;