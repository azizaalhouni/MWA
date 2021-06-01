const { response } = require("express");
const mongoose = require("mongoose");
const Fidget = mongoose.model("Fidget");

const _addCompany = function(req, res, fidget,response){
    console.log("Adding company");
    fidget.company.companyName = req.body.companyName;
    fidget.company.location = parseInt(req.body.location);
    fidget.save(function(err, updatedFidget){
        if(err){
            console.log(err);
            response.status = 500;
            response.message = err;
        
        }else{
            console.log("adding ....");
            response.status = 201;
            response.message = updatedFidget;
        }
        response.message = updatedFidget;
         res.status(response.status).json(response.message);
    });
};
module.exports.AddCompany = function(req, res){
    const fidgetId = req.params.fidgetId;
    Fidget.findById(fidgetId).select("company").exec(function(err, fidget){
        const response = {
            status :200,
            message: ""
        };
        if(err){
            response.status = 500;
            response.message = err
        }else if(!fidget){
            response.status = 404;
            response.message = {"message ": "fidget ID not found "+ fidgetId}
        }
        if(fidget){
            _addCompany(req, res, fidget, response);
        }
        else{
            res.status(response.status).json(response.message);
        }
    });
}
////Update company
const _updateCompany = function(req, res, fidget,response){
   fidget.company.companyName = req.body.companyName;
   fidget.company.location = req.body.location;
   fidget.save(function(err, updatedCompany){
       if(err){
           response.status = 500;
           response.message = err;
       }
      // response.message = updatedCompany;
       res.status(response.status).json(response.message);
   });
}

module.exports.updateFidgetcompany = function(req, res){
    const fidgetId = req.params.fidgetId;
    Fidget.findById(fidgetId).select("company").exec(function(err , fidget){
        const response ={
            status : 204,
        };
        if(err){
            response.status = 500;
            response.message = {"message": "fidgetId not found"};
        }if(!fidget){
            response.status = 404,
            response.message = {"message": "can't find company"}
        }
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else{
       
            _updateCompany(req, res, fidget, response);
        }
    });
}

/////// Delete company
const _deleteCompany = function(req,res, fidget, response){
    fidget.company ={
        companyName :"empty",
        location: 0
    };
    fidget.save(function(err, deletedFidget){
        if(err){
            response.status = 500;
            response.message = err
        }
        response.message = deletedFidget;
        res.status(response.status).json(response.message);
    });
    
};

module.exports.deleteCompany = function(req, res){
    const fidgetId = req.params.fidgetId;
    Fidget.findById(fidgetId).select("company").exec(function(err, fidget){
        const response = {
            status : 204,
            message:""
        };
        if(err){
            response.status = 500;
            response.message = err
        }else if(!fidget){
            response.status = 404;
            response.message = {"message":"fidget does't exsit "};
        }
        if(fidget){
            _deleteCompany(req, res,fidget,response);
        }
        //res.status(response.status).json(response.message);
    });
};


