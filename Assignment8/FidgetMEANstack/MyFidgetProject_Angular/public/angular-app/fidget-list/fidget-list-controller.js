angular.module("fidgetToys").controller("FidgetsController", FidgetsController);

function FidgetsController(FidgetDataFactory){
    const vm = this;
    vm.title = "Fidgets App";
    FidgetDataFactory.getAllFidgets().then(function(response){
        vm.fidgets = response;
    });
}