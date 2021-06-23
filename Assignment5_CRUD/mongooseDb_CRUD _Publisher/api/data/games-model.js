const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//     title : {
//         type: String,
//     required : true
// },
// name: String,
// rating:{
//     type: Number,
//     min: 0,
//     max : 5,
//     required: true
// },
// createdData:{
//     type : Date,
//     "default":Date.Now
// }
// });
const publisherSchema = new mongoose.Schema({
    name:String,
    location: {
        type:{
        type: String,
        "default":"Point"
        },
        coordinates: {
            type: [Number],
            index:"2dsphere"
        }
    }
});
const gameSchema = new mongoose.Schema({
    title:{
        type: String,
        //required: true
    },
    year:Number,
    rate:{
        type: Number,
        min:1,
        max: 4,
        "default":1
    },
    price: Number,

    minPlayers:{
        type:Number,
        min:1,
        max:10
    },
    maxPlayers: Number,
    minAge: Number,
    designers : String,
    publisher: publisherSchema
    //game has a list of reviews for nested docs
    //reviews : [reviewSchema]
});
//Game just a name we can call it jack
//Telling monogodb to use
//setter
mongoose.model("Game",gameSchema,"games");//set it inside mongoos

//Data base should know about this file