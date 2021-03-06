angular.module("fidgetToys").controller("FidgetController",FidgetController);

function FidgetController($routeParams, FidgetDataFactory,AuthFactory){
    const vm = this;
    let fidgetId = $routeParams.id;
    FidgetDataFactory.getOneFidget(fidgetId).then(function(response){
        vm.fidget = response;
    });
    vm.isLoggedIn = function(){
        return AuthFactory.auth.isLoggedIn;
    }
    vm.deleteFidget = function(){
        FidgetDataFactory.deleteOneFidget(fidgetId).then(function(response){
            console.log("Fidget Deleted");
        }).catch(function(error){
            console.log(error);
        });
    }
}