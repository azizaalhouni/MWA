const mongoose = require("mongoose");
const School = mongoose.model("School");//will return the schema

module.exports.schoolGetAll = function(req, res){
    console.log("Get all student");
    School.find().exec(function(err, students){
        console.log("Found students", students);
        res.status(200).json(students);
    })
};
module.exports.schoolGetOne = function(req,res){
    const studentId = req.params.studentId;
    School.findById(studentId).exec(function(err,students){
        console.log("GET student with studentId", studentId);
        res.status(200).json(students);
    })
}
module.exports.schoolAddOne = function(req,res){
    console.log("post new Student");
    const response = {
        status : 201,
        message : ""
    }
    if(req.body && req.body.name && req.body.gpa){
        const newStudent = {};
        newStudent.name = req.body.name;
        newStudent.gpa = parseFloat(req.body.gpa);
        School.create(newStudent, function(err, student){
            if(err){
                console.log("Error creating new Student");
                res.status = 500;
                response.message = err;
            }else{
                console.log("Game created ", student);
                response.message = student;
            }
            res.status(response.status).json(response.message);
        });
    }else{
        console.log("Data missing from POST body");
        response.status = 400;
        response.message = {error :"Request data missing from POST body"};
        res.status(response.status).json(response.message);

        }
    }

    //Update
    
    module.exports.updateStudent = function(req, res){
        console.log("Update student based on the Id");
        const response = {
            status : 201,
            message : ""
        }
        const studentId = req.params.studentId;
        School.findById(studentId).exec(function(err, student){
            const response = {
                status : 204
            };
            if(err){
                console.log("student Id isn't found");
                response.status = 500;
                response.message = err;
            }else if(!students){
                response.status = 404;
                response.message = {"message": "student ID not found"};
            }
            if(response.status !=204){
                res.status(response.status).json(response.message);
            }else {
                student.name = req.body.name;
                student.gpa = req.body.gpa;
                student.save(function(err, updatedGame){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }
        });
    };

    // //Delete
module.exports.deleteStudent = function(req, res){
    console.log("Delete Student");
    const response = {
        status : 201,
        message: ""
    }
    const studentId = req.params.studentId;
    School.findByIdAndDelete(studentId).exec(function(err, deletedStudent){
        const response = {
            status: 204
        };
        if(err){
            console.log("game Id isn't found");
            response.status = 500;
            response.message = err;
        }else if(!deletedStudent){
            response.status = 404;
            response.message = {"message":"Game ID not found"};
        }
        res.status(response.status).json(response.message);
    });
};