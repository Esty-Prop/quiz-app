const mongoose = require("mongoose")

const AnswerSchema = new mongoose.Schema({
    // optionId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'Option'
    // },
    ques:{
        type:String,
        require:true,
    },
    answer:{
        type:String,
        require:true,
    },
    isCorrect:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

module.exports = AnswerSchema