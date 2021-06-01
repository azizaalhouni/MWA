angular.module("fidgetToys").controller("LoginController", LoginController);

function LoginController($location,$window,AuthFactory,UserDataFactory,jwtHelper){
    var vm = this;
    vm.loggedinUser = "Name";
    vm.isActiveTab = function(url){
        const currentPath = $location.path().split("/")[1];
        if (url === currentPath ? "active" : "");
    };
    vm.isLoggedIn = function(){
        if(AuthFactory.auth.isLoggedIn){
            return true;
        }else{
            return false;
        };
    }
        vm.login = function(){
            if(vm.username && vm.password){
                const user = {
                    username : vm.username,
                    password : vm.password
                };
                UserDataFactory.login(user).then(function(response){
                    console.log(response);
                    if(response && response.success){

                        $window.sessionStorage.token = response.token;
                        AuthFactory.auth.isLoggedIn = true;
                        const token = $window.sessionStorage.token;
                        const decodedToken = jwtHelper.decodeToken(token);
                        vm.loggedinUser = decodedToken.name;
                        vm.username = "";
                        vm.password = "";
                        $location.path("/");
                    }
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
        vm.logout = function(){
            AuthFactory.auth.isLoggedIn = false;
            delete $window.sessionStorage.token;
            $location.path("/");
        };
        
    }

