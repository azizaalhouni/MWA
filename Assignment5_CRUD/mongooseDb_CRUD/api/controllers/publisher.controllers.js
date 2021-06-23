const mongoose = require("mongoose");
const Game = mongoose.model("Game");


module.exports.GetAllPublishers = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        res.status(200).json(game.publisher);
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

