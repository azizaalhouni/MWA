angular.module("meanGames", ["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl:"angular-app/welcome/welcome.html",
        access : {restricted: false}
        //The route bellow it is for Ui and should be readable
        //for everybody (Makesense to my users)
        //if id=Abc will go to game-one-controller and change to $routeParams.abc
    }).when("/games", {
        templateUrl:"angular-app/game-list/game-list.html",
        controller:"GamesController1",
        controllerAs:"vm",
        access : {restricted: false}
    }).when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs: "vm",
        access : {restricted: false}
    }).when("/game/:id",{
        templateUrl:"angular-app/game-one/game-one.html",
        controller:"GameController",
        controllerAs: "vm",
        access : {restricted: false}
    }).when("/profile",{
        templateUrl:"angular-app/profile/profile.html",
        access : {restricted: true}
    }).otherwise({
        redirectTo:"/"
    });
}

function run($rootScope,$location,$window,AuthFactory){
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
        console.log(nextRoute);
        //if there is no access and restricted is true
        //This is to enable overcoming restricted URL
        if(nextRoute.access !== undefined && nextRoute.access.restricted
            && !$window.sessionStorage.token && !$window.sessionStorage.isLoggedIn){
      //This is important to prevent any default and will go to home
        event.preventDefault();
        $location.path("/");
        }
    });

}