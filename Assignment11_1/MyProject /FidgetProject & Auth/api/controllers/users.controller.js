const mongoose = require("mongoose");

const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

module.exports.usersRegister = function(req,res){
    const newUser = {
        name : req.body.name || null,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }
    User.create(newUser, function(err, user){
        const response = {
            status : 201,
            message : user
        }
        if(err){
            console.log(err);
            response.status = 400;
            response.message = err;
        }else{
            console.log("User created");
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.usersAthenticate = function(req, res){
    console.log("Authenticate User");
    const authUser = {
        name : req.body.name,
        username : req.body.username
    }
    User.findOne({username: authUser.username}).exec(function(err, user){
        const response = {
            status : 200,
            message : user
        }
        if(err){
            console.log(err);
            response.status = 400;
            response.message = err;
        }else{
            if(!user){
                response.status = 404;
            }else{
                if(bcrypt.compareSync(req.body.password, user.password)){
                    console.log("User Authenticated");
                    const token = jwt.sign({name : user.name}, "cs572", {expiresIn:3600});
                    response.message = {
                        success : true,
                        token : token
                    };

                }else{
                    console.log("Unauthorized");
                    response.status = 401;
                    response.message = {"message": "Unauthorized"};
                }
            }
        }
        res.status(response.status).json(response.message);
              });
            
            }

            //middleware for will check if my request has authorization
            module.exports.authenticate = function(req, res, next){
                const headerExists = req.headers.authorization;
                
                if(headerExists){
                    const token = req.headers.authorization.split(" ")[1];
                    jwt.verify(token, "cs572", function(err, decoded){
                        if(err){
                            console.log(err);
                            res.status(401).json({message: "Unauthorized"});
                        }else{
                            req.user = decoded.user;
                            next();
                        }
                    });
                }else{
                    res.status(403).json({message:"No token provided"});
                }
            }