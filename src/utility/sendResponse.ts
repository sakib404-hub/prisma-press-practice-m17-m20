import type { Response } from "express";
import type { IResponse } from "../types/response";


const sendResponse = <T>(res : Response, statusCode : number, success : boolean, message : string, data ? : T, error ? : unknown)=>{

    const response : IResponse<T> = {
        success,
        message
    }

    if(data !== undefined){
        response.data = data;
    }

    if(error !== undefined){
        response.error = error;
    }

    return res.status(statusCode).json(response);

}

export default sendResponse;