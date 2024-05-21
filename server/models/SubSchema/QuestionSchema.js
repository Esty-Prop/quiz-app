const mongoose = require("mongoose")
const OptionSchema = require("./OptionSchema")

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    options:[OptionSchema],
    // quiz:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'Quiz'
    // }

},{  timestamps: true})
module.exports = QuestionSchema
