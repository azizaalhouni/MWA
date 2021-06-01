//We use factory for separation of concern

angular.module("meanGames").factory(
    "UserDataFactory",UserDataFactory);

function UserDataFactory($http){
    return{
        login: login,
        
    };
    function login(user){
        return $http.post("api/auth", user).then(complete).catch(failed);
    };
    
    function complete(response){
        console.log(response.data);
        return response.data;
    }
    function failed(err){
      return error.status.statusText;  
    }
}