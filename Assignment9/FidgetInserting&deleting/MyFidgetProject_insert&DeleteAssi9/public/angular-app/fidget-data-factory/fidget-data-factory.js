

angular.module("fidgetToys").factory(
    "FidgetDataFactory",FidgetDataFactory);

function FidgetDataFactory($http){
    return{
        getAllFidgets : getAllFidgets,
        getOneFidget : getOneFidget,
        addOneFidget : addOneFidget,
        deleteOneFidget : deleteOneFidget
    };
    function getAllFidgets(){
        return $http.get("api/fidgets").then(complete).catch(failed);
    };
    function getOneFidget(id){
        return $http.get("/api/fidgets/"+id).then(complete).catch(failed);
    };
    function addOneFidget(fidget){
        return $http.post("/api/fidgets/",fidget).then(complete).catch(failed);
    };
    function deleteOneFidget(id){
        return $http.delete("/api/fidgets/"+id).then(complete).catch(failed);
    }
        function complete(response){
            return response.data;
        }
        function failed(err){
            return error.status.statusText;
        }
    }
