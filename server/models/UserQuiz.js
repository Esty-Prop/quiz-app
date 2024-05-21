const mongoose = require("mongoose")
const AnswerSchema = require("./SubSchema/answerSchema")

const UserQuizSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     require: true,
    // },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    answers: [AnswerSchema],
    score:
    {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    complated:
    {
        type:Boolean,
        default:false,
    }
}, { timestamps: true })

module.exports = mongoose.model("UserQuiz", UserQuizSchema)
