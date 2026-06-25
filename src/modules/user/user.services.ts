import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import { PayLoad } from "./user.interface";
import bcrypt from "bcrypt"

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

    const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds);
    

    //? creating the user
    const newUser = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword
        }
    });

    //? creating the profile for the user
    await prisma.profile.create({
       data : {
        user_id : newUser.id,
        profilePhoto
       }
    })


    const user = await prisma.user.findUnique({
        where : {
            id : newUser.id,
            email
        },
        include :{
            profile : true
        },
        omit : {
            password : true
        }
    })

    return user;

}

const getAllUsersFromDB = async()=>{
    const users = await prisma.user.findMany({
        include : {
            profile : true
        }
    });
    return users;
}

const getMyProfileFromDB = async(id : string)=>{
    const user = await prisma.user.findUnique({
        where : {
            id
        },
        omit : {
            password : true
        },
        include : {
            profile : true
        }
    })

    return user;
}

const userServices = {
    registerUserIntoDB,
    getAllUsersFromDB,
    getMyProfileFromDB
}

export default userServices;