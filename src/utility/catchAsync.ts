import { NextFunction, Request, Response } from "express"
import sendResponse2 from "./sendResponse2";
import status from "http-status";

const catchAsync = (fn : Function)=>{
    return async(req : Request, res : Response, next : NextFunction)=>{
        try{
             
            await fn(req, res, next);
        }catch(error){
           
            next(error);
        }
    }
}

export default catchAsync;