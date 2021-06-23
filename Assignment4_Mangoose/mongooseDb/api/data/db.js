const mongoose = require("mongoose");
require("./games-model");
const dbName = "gameStore"
const dbURL = "mongodb://localhost:27017/"+dbName;

//connect to database
mongoose.connect(dbURL,
    {useNewUrlParser:true, useUnifiedTopology:true});

//when the application being interapted
process.on("SIGINT", function(){
//When we get the signal we are going to tell mongose to terminate
mongoose.connection.close(function(){
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
})
});
//Terminate the application CTRL+C
process.on("SIGTERM", function(){
    //When we get the signal we are going to tell mongose to terminate
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    })
    });
    //for restart the process
    process.on("SIGUSR2", function(){
        //When we get the signal we are going to tell mongose to terminate
        mongoose.connection.close(function(){
            console.log("Mongoose disconnected by app restarted");
            process.kill(process.pid,"SIGUSR2");
        })
        });


    //this is logging info
    mongoose.connection.on("connected", function(){
        console.log("Mongoose connected to "+ dbURL);
    });
    mongoose.connection.on("cdisonnected", function(){
        console.log("Mongoose disconnected to ");
    });
    mongoose.connection.on("error", function(error){
        console.log("Mongoose connection error "+ error);
    });