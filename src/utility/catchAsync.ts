import { NextFunction, Request, Response } from "express"
import sendResponse2 from "./sendResponse2";
import status from "http-status";

const catchAsync = (fn : Function)=>{
    return async(req : Request, res : Response, next : NextFunction)=>{
        try{
             
            await fn(req, res, next);
        }catch(error){
           
            const errorMessage = error instanceof Error ? error.message : "Something went wrong!";

            return sendResponse2(res, {
                success : false,
                statusCode : status.INTERNAL_SERVER_ERROR,
                message : errorMessage
            });
        }
    }
}

export default catchAsync;