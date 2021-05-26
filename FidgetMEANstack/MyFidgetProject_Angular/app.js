require("./api/data/db");
const express = require("express");
const router = require("./api/routes");

const app = express();
const path = require("path");
app.set("port", 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("node_modules", express.static(path.join(__dirname,"node_modules")));
app.use(function(req,res, next){
    console.log("Request method ", req.method, "request URL ", req.url);
    next();
});
app.use("/api", router);

const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log(" Listening to port ", port);
});