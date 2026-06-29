import express, { type Application, type Request, type Response } from "express"
import { userRouter } from "./modules/user/user.routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import config from "./config/config";
import sendResponse2 from "./utility/sendResponse2";
import status from "http-status"
import { authRouter } from "./modules/auth/auth.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

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
    sendResponse2(res, {
        success : true,
        statusCode : status.OK,
        message : "This is the Root Route"
    });
})

//? here we will have all the routes
app.use('/api/user', userRouter);

//? here is the route for authentication
app.use('/api/auth', authRouter);


//? adding a not found route
app.use(notFound);
//? adding another middleware that is the global error handler
app.use(globalErrorHandler);

export default app;