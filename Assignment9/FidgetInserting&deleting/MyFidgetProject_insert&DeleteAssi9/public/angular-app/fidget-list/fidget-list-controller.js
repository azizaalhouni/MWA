angular.module("fidgetToys").controller("FidgetsController", FidgetsController);

function FidgetsController(FidgetDataFactory){
    const vm = this;
    vm.title = "Fidgets App";
    vm.isSubmitted = false;
    FidgetDataFactory.getAllFidgets().then(function(response){
        vm.fidgets = response;
    });
     vm.addFidget = function(){
         const newFidget = {
             title : vm.newFidgetTitle,
             price : vm.newFidgetPrice,
             rate : vm.newFidgetRate ,
            companyName : vm.newFidgetCompanyName ,
            location : vm.newCompanyLocation

         };
        if(vm.fidgetForm.$valid){
            FidgetDataFactory.addOneFidget(newFidget).then(function(response){
                console.log("new Fidget Added")
            });

}
    }
}