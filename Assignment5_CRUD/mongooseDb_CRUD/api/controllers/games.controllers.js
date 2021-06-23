
//const ObjectId = require("mongodb").ObjectId;

const mongoose = require("mongoose");
//We need to use schema
const Game = mongoose.model("Game");//will return the schma

module.exports.gamesGetAll = function(req,res){
  console.log("GET all games");
console.log(req.query);
var offset= 0;
var count= 60;
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
  };
  if(req.body && req.body.title && req.body.price && req.body.rate){
    console.log(req.body);
    const newGame ={};
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.rate = parseInt(req.body.rate);
    newGame.publisher = {};
    Game.create(newGame,function(err, game){
      if(err){
        console.log("Error creating games");
       res.status = 500;
       response.message = err;
      }else{
        console.log("Game created ", game);
        response.message = game;
        res.status(201).json(game);
      }
    });
  }else{
   // console.log(req.body.title);
    console.log("Data missing from POST body");
    response.status = 400;
    response.message = {error: "Request data missing from POST body"};
  }
  res.status(response.status).json(response.message);
}

////update the game
module.exports.gamesUpdateOne = function(req, res){

  var gameId = req.params.gameId;
  Game.findById(gameId).exec(function(err, game){
    console.log("Put new game");
    const response = {
      status: 204,
      message: ""
    }
    if(err){
      console.log("Error finding game")
      response.status = 500;
      response.message = err;
    }else if(!game){
      response.status = 404;
      response.message={"message":"Game ID not found"};
    }
    if(response.status !== 204){
      res.status(response.status).json(response.message);
    }else{
      //Update the game
      game.title = req.body.title;
      //game.year = req.body.year;
      game.price = parseFloat(req.body.price);
      //game.minPlayers = req.body.minPlayer;
      //game.maxPlayers = req.body.maxPlayers;
     // game.rate = req.body.rate;
      //game.minAge = req.body.minAge;
      game.save(function(err,updatedGame){
        if(err){
          
          response.status = 500;
          response.message = err;
        }else{
          response.message = {"message":"Updated Game"+gameId};
        }
        res.status(response.status).json(response.message);
      });
    }
  });
}
//Delete
module.exports.gamesDeleteOne = function(req, res){
  console.log("Delete a game reached ");
  const gameId = req.params.gameId;
  Game.findByIdAndDelete(gameId).exec(function(err, game){
    const response = {
      status : 204,
      message: game
    };
    if(err){
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    }else if(!game){
      response.status = 404;
      response.message = {"message": "Game ID not found"};
    }
    console.log("Game deleted");
    res.status(response.status).json(response.message);
  });
}
