const { response } = require("express");
const mongoose = require("mongoose");
const Fidget = mongoose.model("Fidget");

//// GET all fidgets
module.exports.getAllFidgets = function(req, res){
    Fidget.find().exec(function(err, fidgets){  
        res.status(200).json(fidgets);
    });
}
/////GET ONE FIDGET
module.exports.getOneFidget = function(req, res){
    const fidgetId  = req.params.fidgetId;
    Fidget.findById(fidgetId).exec(function(err, fidget){
        console.log("Getting one fidget ");
        res.status(200).json(fidget);
    });
}
////ADD ONE FIDGET
module.exports.addOneFidget = function(req, res){
    Fidget.create({title: req.body.title, price: parseFloat(req.body.price), 
        rate: parseInt(req.body.rate), 
        company : {companyName :req.body.companyName,location : parseInt(req.body.location)}},
        function(err, theNewfidget){
            if(err){
                console.log("error found");
                res.status(400).json(err);
            }else{
                console.log("created");
                res.status(201).json(theNewfidget);
            }
        });
}

/*
    if(req.body && req.body.title && req.body.price){
        console.log("I am adding a new fidget");
        const newFidget = {};
        newFidget.title = req.body.title;
        newFidget.price = parseFloat(req.body.price);
        newFidget.rate = 2;
        //parseInt(req.body.rate);
        //newFidget.company = [companyName ="empty", location = 23];
        Fidget.create(newFidget, function(err, anewFidget){
            console.log("New fidget been added");
            res.status(201).json(anewFidget);
        });
    }
    */

    ////Update Fidget
    module.exports.fidgetUpdateOne = function(req, res){
        var fidgetId = req.params.fidgetId;
        Fidget.findById(fidgetId).exec(function(err, fidget){
            const response = {
                status:204
            };
            if(err){
                response.status = 500;
                response.message = err;
            }else if(!fidget){
                response.status = 404;
                response.message = {"message":"Game ID not found"};
            }
            if(response.status != 204){
                res.status(response.status).json(response.message);
            }else{
            fidget.title = req.body.title;
            fidget.price = parseFloat(req.body.price);
            fidget.rate = parseInt(req.body.rate);
            fidget.save(function(err, updatedfidget){
                if(err){
                    response.status = 500;
                    response.message = err;
                }

                res.status(response.status).json(response.message);
            });
        }
        });

    };
    module.exports.deleteOneFidget = function(req, res){
        const fidgetId = req.params.fidgetId;
        Fidget.findByIdAndDelete(fidgetId).exec(function(err, deletedFidget){
            const response = {
                status : 204,
                message : ""
            };
            if(err){
                response.status =500;
                response.message = err;
            }else if(!deletedFidget){
                response.status = 404;
                response.message = {"message": "FidgetId doesn't exsit"};
            }
            console.log("Fidget beenz")
                res.status(response.status).json(response.message);

        });
    }
