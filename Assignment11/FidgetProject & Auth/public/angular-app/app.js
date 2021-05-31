angular.module("fidgetToys", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/fidget-list/fidget-list.html",
        controller:"FidgetsController",
        controllerAs :"vm"
    }).when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs :"vm"
    }).when("/fidget/:id",{
        templateUrl:"angular-app/fidget-one/fidget-one.html",
        controller:"FidgetController",
        controllerAs:"vm"
    });
}