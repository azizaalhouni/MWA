angular.module("meanGames").controller("LoginController", LoginController);
function LoginController($location,$window,AuthFactory,UserDataFactory,jwtHelper){
    var vm= this;
    vm.loggedinUser = "Name";
    vm.isActiveTab = function(url){
        const currentPath = $location.path().split("/")[1];
        if(url === currentPath ? "active": "");
    };
    vm.isLoggedIn = function(){
    //   if(AuthFactory.auth.isLoggedIn){
        if($window.sessionStorage.isLoggedIn){
          return true;
      }  else{
      return false
    }
};
vm.login = function(){
    if(vm.username && vm.password){
        const user = {
            username: vm.username,
            password: vm.password
        };
        //Then i need to call the back end
        UserDataFactory.login(user).then(function(response){
            console.log(response);
            //We want to check if 
            if(response && response.success){
                //we want to store it in the browser
                $window.sessionStorage.token = response.token;
                // AuthFactory.auth.isLoggedIn = true;
                $window.sessionStorage.isLoggedIn=true;
                //Read the payload off a token
                const token = $window.sessionStorage.token;
                const decodedToken = jwtHelper.decodeToken(token);
                console.log(decodedToken);
                vm.loggedinUser = decodedToken.name;
                vm.username = "";
                vm.password = "";
                $location.path("/");
            }

        }).catch(function(err){
            console.log(err);
          });
    }
};
vm.logout = function(){
    delete $window.sessionStorage.isLoggedIn;
    delete $window.sessionStorage.token;
    $location.path("/");

};
}