
require("./api/data/db");

const express = require("express");
//express to set app in express
const app = express();
//we are going to send file back 
const path = require("path");
const routes = require("./api/routes");

app.set("port",4000);

app.use(express.json({extened :false}));
app.use(function(req,res,next){
  console.log(req.method, req.url);
  next();//do whatever is next
});
app.use(express.static(path.join(__dirname,"public")));//Termination point


//json Routhing
app.use("/api",routes);
//file Routhing

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+ port);
});

