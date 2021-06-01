//we need to use this module in app14 so we need to export

const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controllers.js");
const controllerPublisher = require("../controllers/publisher.controllers");
const controllerReviews = require("../controllers/reviews.controllers");
const controllerUsers = require("../controllers/users.controller");

//For mongoose

router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerUsers.authenticate,controllerGames.gameAddOne);


router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
.get(controllerPublisher.GetAllPublishers)
.post(controllerPublisher.publishersAddOne)
.delete(controllerPublisher.publisherDelete);

router.route("/games/:gameId/reviews")
.get(controllerReviews.GetAllReviews)
.post(controllerReviews.AddReview)
.put(controllerReviews.updateReview);
//.delete(controllerReviews.deleteOneReview);
router.route("/games/:gameId/reviews/:reviewId")
.get(controllerReviews.GetOneReview)
.put(controllerReviews.updateReview)
.delete(controllerReviews.deleteOneReview);

router.route("/users")
.post(controllerUsers.usersRegister);

router.route("/auth")
.post(controllerUsers.usersAthenticate);

module.exports = router;