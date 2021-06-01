const { response } = require("express");
const mongoose = require("mongoose");
const Fidget = mongoose.model("Fidget");

//// GET all fidgets
module.exports.getAllFidgets = function(req, res){
    let offset = req.params.offset;
    let count = req.params.count;
    let maxCount = 0;
    Fidget.count({}, function (error, result){
        maxCount = result;
        if(req.query && req.query.offset){
            offset = parseInt(req.query.offset);
        }
        if(req.query && req.query.offset){
            count = parseInt(req.query.count);
        }
        if(isNaN(offset) || isNaN(count)){
            res.status(400).json({message: "Offset and count must be a number"});
            return;
        }
        if(count > maxCount){
            res.status(400).json({message : "Count must not exceed "+ maxCount });
        }else{
            Fidget.find().skip(offset).limit(count).exec(function(err, fidgets){ 
                if(err){
                    res.status(400).json(err);
                }  else {
                    res.status(200).json({fidgets, maxCount});
                }
    });
}
    });
}

/////////////////////Get by Title////////////////
module.exports.fidgetGetByTitle = function (req,res){
    console.log("Search by title");
    let offset = 0;
    //req.params.offset;
    let count = 2;
    //req.params.count;
    let maxCount = 0;
    const title = req.params.title;
    Fidget.count({}, function (error, result){
        maxCount = result;
        if(req.query && req.query.offset){
            offset = parseInt(req.query.offset);
        }
        if(req.query && req.query.offset){
            count = parseInt(req.query.count);
        }
        if(isNaN(offset) || isNaN(count)){
            res.status(400).json({message: "Offset and count must be a number"});
            return;
        }
        if(count > maxCount){
            res.status(400).json({message : "Count must not exceed "+ maxCount });
        }else{
            Fidget.find({title: title}).skip(offset).limit(count).exec(function(err, fidgets){ 
                if(err){
                    res.status(400).json(err);
                }  else {
                    res.status(200).json(fidgets);
                }
    });
}
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
