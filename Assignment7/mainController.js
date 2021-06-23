angular.module("myControllerApp").controller("MainController",MainController);

function MainController($http){
    var vm=this;
    vm.name ="Seattle 911 Calls on 05/23/2021 Yesterday";
$http.get("https://data.seattle.gov/resource/fire-911.json?$$app_token=83GHgAaXwrGXR2mx8it9JiGDw&$where=datetime%3E=%272021-05-23%27").then(function(response){
    vm.items = response.data;
});
   
}

