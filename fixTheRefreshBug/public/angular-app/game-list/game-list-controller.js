angular.module("meanGames").controller("GamesController1", GamesController);

function GamesController(GameDataFactory1,AuthFactory){
    const vm = this;
    vm.title = "Mean Games App";
     vm.isSubmitted = false;
    
    GameDataFactory1.getAllGames1().then(function(response){
        vm.games = response;
    });
    vm.isLoggedIn = function(){
        // return AuthFactory.auth.isLoggedIn;
        if($window.sessionStorage.isLoggedIn){
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