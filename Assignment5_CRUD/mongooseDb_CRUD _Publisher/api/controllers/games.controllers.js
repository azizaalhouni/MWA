
//const ObjectId = require("mongodb").ObjectId;

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
Game.find().skip(offset).limit(count).exec(function(err,games){
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
module.exports.gameAddOne = function(req, res){
  
  console.log("Post new Game");
  const response = {
    status : 201,
    message:""
  }
  if(req.body && req.body.title && req.body.price && req.body.rate){

    // Game.create({title: req.body.title, 
    //   price: parseFloat(req.body.price), rate: parseFloat(req.body.rate)},
    //   function(err, game) {
    //     if (err) {
    //     console.log("Error creating games"); res.status(400).json(err);
    //     } else {
    //     console.log("Game created", game);
    //     res.status(201).json(game); }
    //     });
    //   }

    console.log(req.body);
    const newGame ={};
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.rate = parseInt(req.body.rate);
    newGame.publisher={};
    Game.create(newGame,function(err, game){
      if(err){
        console.log("Error creating games");
       res.status = 500;
       response.message = err;
      }else{
        console.log("Game created ", game);
        response.message = game;
        //res.status(201).json(game);
      }
      //if it is succed wait the call back to send it back
      res.status(response.status).json(response.message);

    });
  }else{
   // console.log(req.body.title);
    console.log("Data missing from POST body");
    response.status = 400;
    response.message = {error: "Request data missing from POST body"};
    //if it is faild
    res.status(response.status).json(response.message);

  }
}


module.exports.gamesUpdateOne = function(req, res){
  var gameId = req.params.gameId;
  Game.findById(gameId).select("")
}