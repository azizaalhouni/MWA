
const ObjectId = require("mongodb").ObjectId;

const mongoose = require("mongoose");
//We need to use schema
const Game = mongoose.model("Game");//will return the schma

module.exports.gamesGetAll = function(req,res){
  console.log("GET all games");
console.log(req.query);
var offset= 0;
var count= 5;
if(req.query && req.query.offset){
  offset = parseInt(req.query.offset);
}
if (req.query && req.query.count) {
count= parseInt(req.query.count, 10); 
}


Game.find().exec(function(err,games){
  console.log("Found games", games);
  res.status(200).json(games);
})   
};
module.exports.gamesGetOne = function(req, res){
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function(err, game){
    console.log("GET game with gameId", gameId);
    res.status(200).json(game);
  })
}


