import { Response } from "express";
import { IResponse2 } from "../types/iResponse";

const sendResponse2 = <T>(res : Response, data : IResponse2<T>)=>{
        
    const response : IResponse2<T> = {
            success : data.success,
            statusCode : data.statusCode,
            message : data.message
        }

        if(data.data !== undefined){
            response.data = data.data;
        }

        if(data.meta !== undefined){
            response.meta = data.meta;
        }
    return res.status(data.statusCode).json(response);
}

export default sendResponse2;