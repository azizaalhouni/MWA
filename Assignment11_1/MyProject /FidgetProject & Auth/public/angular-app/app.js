angular.module("fidgetToys", ["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/welcome/welcome.html",
        access : {restricted : false}
    }).when("/fidgets",{
        templateUrl:"angular-app/fidget-list/fidget-list.html",
        controller:"FidgetsController",
        controllerAs :"vm",
        access : {restricted: false}
    }).when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs :"vm",
        access : {restricted : false}
    }).when("/fidget/:id",{
        templateUrl:"angular-app/fidget-one/fidget-one.html",
        controller:"FidgetController",
        controllerAs:"vm",
        access : {restricted: false}
    }).when("/profile",{
        templateUrl:"angular-app/profile/profile.html",
        access : {restricted: true}
    }).otherwise({
        redirectTo: "/"
});
    }

    function run($rootScope, $location,$window, AuthFactory){
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
            if(nextRoute.access !== undefined && nextRoute.access.restricted
                && !$window.sessionStorage.token && !AuthFactory.auth.isLoggedIn){
                    event.preventDefault();
                    $location.path("/");
                }
        });
    }

