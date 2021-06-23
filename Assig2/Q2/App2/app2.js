const express = require("express");
const app = express();
const path = require("path");
app.set("port",3000);
app.get("/", function(req,res){
    console.log("GET received.");
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});
const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+ port);
});