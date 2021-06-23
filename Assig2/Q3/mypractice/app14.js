
const express = require("express");
//express to set app in express
const app = express();
//we are going to send file back 
const path = require("path");
const routes = require("./api/routes");
app.set("port",3000);
//interceptor for the sack of loginneg
//this will satisfy any request 

app.use(function(req,res,next){//every file start with css need to be logged
  console.log(req.method, req.url);
  next();//do whatever is next
});


//when someone request a page give them the page back
//ex if someone ask for page1 give them page1 from this folder
app.use(express.static(path.join(__dirname,"public")));//Termination point


//json Routhing
app.use("/api",routes);
//file Routhing

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+ port);
});

