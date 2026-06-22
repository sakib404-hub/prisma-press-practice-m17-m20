import app from "./app";
import "dotenv/config"

//? gettingg the port from the env file
const PORT =  process.env.PORT || 5000;

const main = () =>{
    try{

        console.log("Database connected successfully!");

        //? this is the function for creating the server and saying that it is running  successfully on that port number
        const server = app.listen(PORT, ()=>{
            console.log(`This application is listening from port number : ${PORT}`);
        })

        //? event emitters server.on(event, callbackfunction)
        server.on("error", (err)=>{
            console.error("Server failed with : ",err);
            process.exit(1);
        })
    

    }catch(err){
        console.log(err);
        console.log("Error Occured starting the server");
        process.exit(1);
    }
}

main();