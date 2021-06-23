//we need to use this module in app14 so we need to export

const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controllers.js");

//router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games").get(controllerGames.gamesGetAll).post(function(req,res){
   console.log("Post json request received");
    res.status(200).json({"jsonDataPost":true});
});
module.exports = router;