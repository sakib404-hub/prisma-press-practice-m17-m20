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
import { postRouter } from "./modules/posts/post.route";
import { commentRouter } from "./modules/comments/comments.route";
import { subscriptionRouter } from "./modules/subscription/subscription.route";
import stripe from "./lib/stripe";

const app : Application = express();



app.post('/api/subscription/webhook', express.raw({
    type : "application/json"
}),  (request, response) => {
  let event = request.body;
  console.log(event ,"Stripe request body");
  console.log(request.headers , " Stripe request headers");

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (config.web_hook_secret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature']!;

    //? converting event buffer to a valid object
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        config.web_hook_secret
      );
    } catch (err : any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400).json({
        message : err.message
      });
    }
  }

  console.log(event , "This is the event after try block!");

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();

})

//? here we will write the middlewares that we needed
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : config.app_url,
    credentials: true
}))


const serverStartTime = Date.now();

app.get("/", (req :Request, res : Response)=>{
    const uptimeInSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
    const hours =  Math.floor(uptimeInSeconds / 3600);
    const minutes =  Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;


    return res.status(status.OK).json({
        success : true,
        statusCode : status.OK,
        message : "This is the Root Route",
        version : "1.0.0",
        uptime : {
            hours :hours,
            minutes : minutes,
            seconds : seconds
        },
         author: {
            name: "Shakib Hossen",
            role: "Backend Developer",
            github: "https://github.com/sakib404-hub",
            email: "akibhossainsakib7011@gmail.com",
        },
        timeStamp : new Date().toISOString()
    })
})

//? here we will have all the routes
app.use('/api/user', userRouter);

//? here is the route for authentication
app.use('/api/auth', authRouter);

//? route for the post
app.use('/api/posts', postRouter);

//? route for the comments
app.use('/api/comments', commentRouter);

//? route for the subscription
app.use('/api/subscription', subscriptionRouter);

//? adding a not found route
app.use(notFound);
//? adding another middleware that is the global error handler
app.use(globalErrorHandler);

export default app;