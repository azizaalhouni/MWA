//angular.module("myControllerApp",[]);
angular.module("myControllerApp",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"templates/main.html",
        controller: "MainController",
        controllerAs:"mainCtrl"
    }).when("/about",{
        templateUrl:"templates/about.html",
        controller:"AboutController",
        controllerAs:"aboutCtrl"
    }).otherwise({
        redirectTo :"/"
    });
}