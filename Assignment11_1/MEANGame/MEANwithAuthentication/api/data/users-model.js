const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    name: {
        type : String
    },
    password: {
        type: String,
        required: true
    }
});

//Compile the model(add the schema to mongoose)
mongoose.model("User", userSchema);