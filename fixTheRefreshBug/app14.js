
require("./api/data/db");

const express = require("express");
//express to set app in express
const app = express();
//we are going to send file back 
const path = require("path");
const routes = require("./api/routes");

app.set("port",3000);

app.use(express.json({extened :false}));

app.use("/api", function(req, res,next){
  res.header("Access-control-Allow-Origin","http://localhost:4200");
  res.header("Access-Control-Allow-Headers","Origin,x-Requested-With,Content-Type, Accept" );
  next();
})
app.use(function(req,res,next){
  console.log(req.method, req.url);
  next();//do whatever is next
});
app.use(express.static(path.join(__dirname,"public")));//Termination point
//To serve node_modules to ui
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

//json Routhing
app.use("/api",routes);//Termination middleWare
//file Routhing

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+ port);
});

