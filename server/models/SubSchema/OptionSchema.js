const mongoose = require("mongoose")

const OptionSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    isCorrect:{
        type:Boolean,
        default:false,
    }
},{})

module.exports = OptionSchema