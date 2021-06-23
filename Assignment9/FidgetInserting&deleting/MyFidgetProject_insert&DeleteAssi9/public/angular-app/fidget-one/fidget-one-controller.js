angular.module("fidgetToys").controller("FidgetController",FidgetController);

function FidgetController($routeParams, FidgetDataFactory){
    const vm = this;
    let fidgetId = $routeParams.id;
    FidgetDataFactory.getOneFidget(fidgetId).then(function(response){
        vm.fidget = response;
    });
    vm.deleteFidget = function(){
        FidgetDataFactory.deleteOneFidget(fidgetId).then(function(response){
            console.log("Fidget Deleted");
        });
    }
}