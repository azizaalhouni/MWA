angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl:"angular-app/game-list/game-list.html",
        controller:"GamesController",
        controllerAs:"vm"
        //The route bellow it is for Ui and should be readable
        //for everybody (Makesense to my users)
        //if id=Abc will go to game-one-controller and change to $routeParams.abc
    }).when("/game/:id",{
        templateUrl:"angular-app/game-one/game-one.html",
        controller:"GameController",
        controllerAs: "vm"
    });
}