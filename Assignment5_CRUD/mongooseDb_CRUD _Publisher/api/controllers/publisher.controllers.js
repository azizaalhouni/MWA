const { response } = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");


module.exports.GetAllPublishers = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        if(err){
            console.log("Error finding game");
        }else if(!game){
            console.log("Game id not found in db", gameId);
        }else{
        res.status(200).json(game.publisher);
        }
    });
};
// module.exports.GetOnePublisher = function(req, res){
//     const gameId = req.params.gameId;
//     const publisherId = req.params.publisherId;
//     Game.findById(publisherId).select("publisher").exec(function(err, publisher){
//         const publisher = game.publisher.id(publisherId);
//         console.log("Get the publisher Id ", publisherId);
//         res.status(200).json(publisher);
//     })
// }

const _addPublisher = function(req, res, game, response){
    console.log("Add publisher");
    console.log("req body", req.body);
    console.log("game",game);
    //game.publisher={};
    game.publisher.name = req.body.name;
   // game.publisher.location.type = "Point";
   // game.publisher.location.coordinates = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
    //addElementToArray(game.publishers, newPublisher);
    game.save(function(err, updatedGame){
        if(err){
            console.log("Error "+ err);
            response.status = 500;
            response.message = err;
        }else{
            response.status = 201;
            response.message = updatedGame.publisher;
        }
       response.message = updatedGame;
        res.status(response.status).json(response.message);
        
    });
};
module.exports.publishersAddOne = function(req, res){
    console.log("Add one publisher to a game" );
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        const response = {
            status: 201,
            message: game
        };
        if(err){
            response.status = 500;
            response.message= {"message":"Game Id not found"+gameId};
        }else if(!game){
            console.log("Game is not found in db");
            response.status = 404;//404 because they ask for game doesn't exsit 
            response.message = {"message": "Game ID not fount"+ gameId};
        } 
        //This decides how to send a response
        if(game){
            console.log("found Game");
            if(!(game.publisher.name)){
                game.publisher = {
                    name:"empty",
                    location:[]
                };
            }
            _addPublisher(req,res, game,response);
        }else{
            res.status(response.status).json(response.message);
        }
    })
}


///Delete Publisher
var _deletePublisher = function(req, res, game){
    game.publisher = {
        name:"empty",
        location:[]
    };

    //game.publisher.remove();
    game.save(function(err, game){
        var response = {status : 204};
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.publisherDelete = function(req, res){
    var gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function(err, game){
        const response ={
            status : 204
        };
        console.log("trying to find the publisher");
        if(err){
            console.log("Error finding a game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = {"message":"Game ID not found"};
        }
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else{
            console.log("found the game");
            _deletePublisher(req, res, game);
        }
        console.log("don't know");
    });
};
/////Update
var _updatePublisher = function(req, res, game){
    game.publisher.name = req.body.name;
    game.save(function(err, updateGame){
        var response = {
            status: 204
        };
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.publisherUpdate = function(req, res){
    var gameId = req.params.gameId;
    //var publisherId = req.parms.publisherId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).exec(function(err, game){
        var response = {
            status: 204
        };
        if(err){
            console.log("Error find game");
            response.status = 500;
            response.message = err;
        }else if (!game){
            response.status = 404;
            response.message = {"message": "Game ID not found"};
        }
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else {
            _updatePublisher(req,res,game);
        }
    });
};