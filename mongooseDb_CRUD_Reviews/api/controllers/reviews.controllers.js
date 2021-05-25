const { response } = require("express");
const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.GetAllReviews = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
        res.status(200).json(game.reviews);
    });
};
module.exports.GetOneReview = function(req, res){
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
        console.log("GET reviewId "+ reviewId + "for gameId "+ gameId);
        const review = game.reviews.id(reviewId);
        res.status(200).json(review);
    });
}
//Add review
var _addReview = function(req, res, game,response){
    game.reviews = game.reviews || [];
    game.reviews.push(req.body);
 
    game.save(function(err, updatedReview){
        if(err){
            console.log("Can't add review");
            response.status = 500;
            response.message = ""
        }else{
            console.log("No error found");
            response.status = 201;
            response.message = updatedReview;
        }
        response.message = updatedReview;
        res.status(response.status).json(response.message);
    })
}
module.exports.AddReview = function(req, res){
    console.log("Add one review to a game" );
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
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
            console.log("Game found");
            _addReview(req,res, game,response);
        }else{
            res.status(response.status).json(response.message);
        }
    })
}
////Update Review
const _updateReview = function(req, res, game, response){
    const reviewId= req.params.reviewId;
    const reviewsId = game.reviews.id(reviewId);
       
    console.log("I am going to update the game");
    reviewsId.title = req.body.title;
    reviewsId.review = req.body.review;
    game.save(function(err, updatedReview){
        // var response = {
        //     status: 204
        // };
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else{
            console.log("No error found");
            response.status = 201;
            response.message = updatedReview;
        }
        response.message = updatedReview;
        res.status(response.status).json(response.message);
    });
}

module.exports.updateReview = function(req, res){
    console.log("Updating Review");
    const gameId = req.params.gameId;
    
    
    Game.findById(gameId).select("reviews").exec(function(err, game){
        console.log("gameId "+ gameId);
        var response = {
            status: 204
        };
        if(err){
            response.status = 500;
            response.message = {"message": "Game Id not found"+ gameId};
        }else if(!game){
            console.log("Game isn't found in db");
            response.status = 404;
            response.message = {"message": "Game ID not found"+ gameId};
        }
        if(game){
            console.log("Game found");
            _updateReview(req,res,game, response);
        }else {
            res.status(response.status).json(response.message);
        }
    })
}
/////Delete Game
var _deletePReview = function(req, res, game){
game.reviews.id(req.params.reviewId).remove();
    
    console.log("Going to delete the review");
    ///game.reviews.remove();
    game.save(function(err, deletedReview){
        var response = {status : 204};
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        response.message = deletedReview;
        res.status(response.status).json(response.message);
    });
}
module.exports.deleteOneReview = function(req, res){
    var gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game){
        var response ={
            status : 204
        };
        console.log("trying to find the review");
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
            _deletePReview(req, res, game);
        }
        console.log("don't know");
    });
};