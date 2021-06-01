angular.module("meanGames").controller("GameController",GameController);

function GameController($routeParams, GameDataFactory,AuthFactory){
    const vm = this;
    let gameId = $routeParams.id;
    GameDataFactory.getOneGame(gameId).then(function(response){
        vm.game = response;
        vm.rating = _getStarRating(response.rate);
    });
    vm.isLoggedIn = function(){
        return AuthFactory.auth.isLoggedIn;
    }
    vm.deleteGame = function(){
        GameDataFactory.deleteOneGame(gameId).then(function(response){
            console.log("Game Deleted");
        });
    }
    }
    function _getStarRating(stars){
        return new Array(stars);
    }