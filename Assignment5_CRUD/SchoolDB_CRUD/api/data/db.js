const mongoose = require("mongoose");
require("./school-model.js");
const dbName = "schoolDb";
const dbURL = "mongodb://localhost:27017/"+dbName;

//connect to db
mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected",function(){
    console.log("Mongoose connected to "+ dbURL);
});
mongoose.connection.on("disconnected",function(){
    console.log("Mongoose disconnected to ");
});
mongoose.connection.on("error", function(error){
    console.log("Mongoose connection error "+ error);
});