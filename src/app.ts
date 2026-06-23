import express, { type Application, type Request, type Response } from "express"
import { userRouter } from "./modules/user/user.routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import config from "./config/config";
import sendResponse from "./utility/sendResponse";

const app : Application = express();

//? here we will write the middlewares that we needed
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : config.app_url,
    credentials: true
}))


app.get("/", (req :Request, res : Response)=>{
    sendResponse(res, 200, true, 'Hellow this is the root route');
})

//? here we will have all the routes
app.use('/api/user', userRouter)

export default app;