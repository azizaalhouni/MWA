const mongoose = require("mongoose");

//To create the subdocument
const addressSchema = new mongoose.Schema({
    street : String,
    city : String,
    zip : Number
});
const schoolSchema = new mongoose.Schema({
    name: String,
    gpa: Number,
    address: [addressSchema]
});

mongoose.model("School",schoolSchema,"students");
