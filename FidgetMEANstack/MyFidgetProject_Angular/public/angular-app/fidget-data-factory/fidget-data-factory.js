

angular.module("fidgetToys").factory(
    "FidgetDataFactory",FidgetDataFactory);

function FidgetDataFactory($http){
    return{
        getAllFidgets : getAllFidgets,
        getOneFidget : getOneFidget
    };
    function getAllFidgets(){
        return $http.get("api/fidgets").then(complete).catch(failed);
    };
    function getOneFidget(id){
        return $http.get("/api/fidgets/"+id).then(complete).catch(failed);
    };
        function complete(response){
            return response.data;
        }
        function failed(err){
            return error.status.statusText;
        }
    }
