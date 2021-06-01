

angular.module("fidgetToys").factory(
    "FidgetDataFactory",FidgetDataFactory);

function FidgetDataFactory($http){
    return{
        getAllFidgets : getAllFidgets,
        getOneFidget : getOneFidget,
        addOneFidget : addOneFidget,
        deleteOneFidget : deleteOneFidget,
        searchByTitle :searchByTitle
    };
    // function getAllFidgets(){
    //     return $http.get("api/fidgets").then(complete).catch(failed);
    // };
    function getAllFidgets(count,offset){
        return $http.get(`api/fidgets?count=${count}&offset=${offset}`).then(complete).catch(failed);
    };
    function searchByTitle(title) {
        console.log("title search");
        return $http.get("/api/fidgets/title/" + title).then(complete).catch(failed);
    }
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
