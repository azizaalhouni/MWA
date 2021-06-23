const mongoose = require("mongoose");

const School = mongoose.model("School");//will return the schema
//To get all address with student Id
// module.exports.addressesGetAll = function(req, res){
//     console.log("Get all the address for the student");
//     const studentId = req.params.studentId;
//     School.findById(studentId).select("address").exec(function(err, address){
//         console.log("Get address with studentId", studentId);
//         res.status(200).json(address);
//     })
// };
//if you want to get all address without the student id
module.exports.addressesGetAll = function(req, res){
    console.log("Get all the address for the student");
    const studentId = req.params.studentId;
    School.findById(studentId).select("address").exec(function(err, students){
        console.log("Get address with studentId", studentId);
        res.status(200).json(students.address);
    })
};
module.exports.addressGetOne = function(req,res){
    const addressId = req.params.addressId;
    School.findById(addressId).exec(function(err,students){
        console.log("GET student with studentId", addressId);
        res.status(200).json(students);
    })
}
