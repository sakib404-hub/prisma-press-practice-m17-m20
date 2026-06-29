import { NextFunction, Request, Response } from "express";
import status from "http-status";


export const globalErrorHandler = (error: any, req : Request, res : Response, next : NextFunction)=>{

    let statusCode ;
    let errorMessage = error.message || "Internal Server Error";
    let errorName = error.name || "Internal Server Error";
    let errorDetails = error.stack;

    return res.status(statusCode || status.INTERNAL_SERVER_ERROR).json({
        success : false,
        statusCode,
        name : errorName,
        message : errorMessage,
        error : errorDetails
    })

}