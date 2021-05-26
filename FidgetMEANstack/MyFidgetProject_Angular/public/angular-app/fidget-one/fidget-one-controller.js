angular.module("fidgetToys").controller("FidgetController",FidgetController);

function FidgetController($routeParams, FidgetDataFactory){
    const vm = this;
    let fidgetId = $routeParams.id;
    FidgetDataFactory.getOneFidget(fidgetId).then(function(response){
        vm.fidget = response;
    })
}