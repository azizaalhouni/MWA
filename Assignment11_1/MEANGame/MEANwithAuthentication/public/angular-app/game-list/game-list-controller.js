angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory,AuthFactory){
    const vm = this;
    vm.title = "Mean Games App";
     vm.isSubmitted = false;
    
    GameDataFactory.getAllGames().then(function(response){
        vm.games = response;
    });
    vm.isLoggedIn = function(){
        // return AuthFactory.auth.isLoggedIn;
        if(AuthFactory.auth.isLoggedIn){
            return true;
        }else{
            return false;
        }
    }
    vm.addGame = function(){
        //all the information I am getting from view (form)
        const newGame = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
             minAge: vm.newGameMinAge,
             designers: vm.newGameDesigner
        };
        if(vm.gameForm.$valid){
            GameDataFactory.addOneGame(newGame).then(function(response){
                console.log("Game saved");
            }).catch(function(error){
                
                console.log(error);
            });
        }
    }
}