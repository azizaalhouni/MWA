angular.module("fidgetToys").controller("FidgetsController", FidgetsController);

function FidgetsController(FidgetDataFactory,AuthFactory){
    const vm = this;
    vm.count = 3;
    vm.offset = 0;
    vm.title = "Fidgets App";
     vm.isSubmitted = false;
    loadingData = function(count,offset){
        
    FidgetDataFactory.getAllFidgets(count,offset).then(function({fidgets, maxCount}){
        vm.fidgets = fidgets;
        vm.maxCount = maxCount;
    });
}
    loadingData (vm.count, vm.offset);
    vm.nextPage = function(type){
    {
        vm.offset = (type == "next")? vm.offset + vm.count : vm.offset - vm.count ;
        loadingData(vm.count,vm.offset);
    }
}
vm.searchByTitle = function() {
    const title = vm.newSearchTitle;
    FidgetDataFactory.searchByTitle(title).then(function (response) {
        console.log("Started searching");
        vm.fidgets=response;
    }).catch(function (error) {
        console.log(error);
    });
}
vm.isLoggedIn = function(){

    if(AuthFactory.auth.isLoggedIn){
        return true;
    }else {
        return false;
    }

}
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
// function FidgetsController(FidgetDataFactory){
//     const vm = this;
//     vm.title = "Fidgets App";
//     vm.isSubmitted = false;
//     FidgetDataFactory.getAllFidgets().then(function(response){
//         vm.fidgets = response;
//     });
//      vm.addFidget = function(){
//          const newFidget = {
//              title : vm.newFidgetTitle,
//              price : vm.newFidgetPrice,
//              rate : vm.newFidgetRate ,
//             companyName : vm.newFidgetCompanyName ,
//             location : vm.newCompanyLocation

//          };
//         if(vm.fidgetForm.$valid){
//             FidgetDataFactory.addOneFidget(newFidget).then(function(response){
//                 console.log("new Fidget Added")
//             });

// }
//     }
// }