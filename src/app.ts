import express, { type Application, type Request, type Response } from "express"

const app : Application = express();

//? here we will write the middlewares that we needed


app.get("/", (req :Request, res : Response)=>{
    res.status(200).json({
        success : true,
        statusCode : 200,
        message : "The server is Running successfully"
    })
})

export default app;