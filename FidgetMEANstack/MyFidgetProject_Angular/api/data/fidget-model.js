const  mongoose  = require("mongoose");


const companySchema = new mongoose.Schema({
    companyName : String,
    location : Number
})

const fidgetSchema = new mongoose.Schema({
        title : String,
        price: Number,
        rate:{
            type: Number,
            min:1,
            max:5,
            "default":1
        },
        company : companySchema
});

mongoose.model("Fidget", fidgetSchema, "fidgets");