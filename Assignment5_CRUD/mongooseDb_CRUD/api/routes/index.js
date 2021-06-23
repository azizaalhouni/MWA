//we need to use this module in app14 so we need to export

const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controllers.js");
const controllerPublisher = require("../controllers/publisher.controllers");

//For mongoose

router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerGames.gameAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers").get(controllerPublisher.GetAllPublishers);
//router.route("/games/:gameId/publishers/:publisherId").get(controllerPublisher.GetOnePublisher);
//router.route("/games/:gameId/publishers/:publisherId")

module.exports = router;