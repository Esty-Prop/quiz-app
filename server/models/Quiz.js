const mongoose = require("mongoose")
const QuestionSchema = require("./SubSchema/QuestionSchema")

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    questions:[QuestionSchema],
    // completed: {
    //     type: Boolean,
    //     default: false,
    // },
    // mark: {
    //     type: Number,
    //     required: () => this.completed,
    //     min:0,
    //     max:100,
    // },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'User'
    },

    isActive:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})
module.exports = mongoose.model("Quiz",quizSchema)