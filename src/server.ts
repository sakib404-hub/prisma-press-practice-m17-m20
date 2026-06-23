import app from "./app";
import "dotenv/config"
import config from "./config/config";
import { prisma } from "./lib/prisma";


const main = async() =>{
    try{

        await prisma.$connect();
        console.log("Database connected successfully!");

        //? this is the function for creating the server and saying that it is running  successfully on that port number
        const server = app.listen(config.portNumber, ()=>{
            console.log(`This application is listening from port number : ${config.portNumber}`);
        })

        //? event emitters server.on(event, callbackfunction)
        server.on("error", (err)=>{
            console.error("Server failed with : ",err);
            process.exit(1);
        })
    

    }catch(err){
        console.log(err);
        console.log("Error Occured starting the server");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();