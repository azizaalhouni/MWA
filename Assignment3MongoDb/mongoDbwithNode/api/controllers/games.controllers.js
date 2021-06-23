
const gamesData = require("../data/games-data.json");
const dbConnection = require("../data/dbconnection.js");
module.exports.gamesGetAll = function(req,res){
  const db = dbConnection.get();
  console.log("db",db);
  const collection = db.collection("games");
  
    console.log("GET all games");
console.log(req.query);
var offset= 0;
var count= 7;

if (req.query && req.query.count) {
count= parseInt(req.query.count, 10); 
}
collection.find().skip(offset).limit(count).toArray(function(err,docs){
  console.log("Found games", docs);
  res.status(200).json(docs);
})   
};


