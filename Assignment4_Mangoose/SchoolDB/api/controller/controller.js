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