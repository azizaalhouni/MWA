angular.module("fidgetToys", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/fidget-list/fidget-list.html",
        controller:"FidgetsController",
        controllerAs :"vm"
    }).when("/fidget/:id",{
        templateUrl:"angular-app/fidget-one/fidget-one.html",
        controller:"FidgetController",
        controllerAs:"vm"
    });
}