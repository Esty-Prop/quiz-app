const Quiz = require("../models/Quiz")
const UserQuiz = require("../models/UserQuiz")


const getQuizzes = async (req, res) => {
    const quizzes = await Quiz.find({}, {}).populate('user').lean()
    if (!quizzes.length) {
        return res.status(400).json({
            error: true,
            message: "No quizs",
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: quizzes,
    })
}
const getQuizzesInfo = async (req, res) => {
    const quizzes = await Quiz.find({}, {}).populate('user').lean()

    if (!quizzes.length) {
        return res.status(400).json({
            error: true,
            message: "No quizs",
            data: null
        })
    }
    const quizzesWithUserQuizzes = await Promise.all(quizzes.map(async (quiz) => {
        const userQuizzes = await UserQuiz.find({ quiz: quiz._id }).select(["id", "score", "user"]).lean()
        return { ...quiz, userQuizzes }
    }))

    const q = quizzesWithUserQuizzes.map((quiz) => {
        let avg = 0
        const cnt = quiz.userQuizzes.length
        quiz.userQuizzes.forEach(userQuiz => {
            avg += userQuiz.score
        });
        if (cnt)
            avg = avg / cnt
        return { avg, cnt, ...quiz }
    })

    res.json({
        error: false,
        message: '',
        data: q,
    })
}
const getActiveQuizzes = async (req, res) => {
    const quizzes = await Quiz.find({isActive: true}, {}).populate('user').lean()
    if (!quizzes.length) {
        return res.status(400).json({
            error: true,
            message: "No quizs",
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: quizzes,
    })
}
const getQuizById = async (req, res) => {
    const { id } = req.params
    const quiz = await Quiz.findById(id, {}).populate("user").lean()
    if (!quiz) return res.status(404).json("No quiz found")
    res.json({
        error: false,
        message: "",
        data: { quiz }
    })
}
const addQuiz = async (req, res) => {
    const { title, user, questions, isActive } = req.body
    //validation
    if (!title) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }

    const quiz = await Quiz.create({ title, user, questions, isActive })
    if (!quiz) {
        return res.status(400).json({
            error: true,
            message: "Error while adding new quiz",
            data: null
        })
    }
    res.status(201).json({
        error: false,
        message: `Add quiz success`,
        data: { quiz }
    })
}

const updateQuiz = async (req, res) => {
    const { _id, title, user, questions, isActive
    } = req.body
    if (!title) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const quiz = await Quiz.findById(_id).exec()
    if (!quiz) {
        return res.status(400).json({
            error: true,
            message: "No Quiz found",
            data: null
        })
    }

    quiz.title = title
    quiz.user = user
    quiz.questions = questions
    quiz.isActive = isActive

    const updateQuiz = await quiz.save()
    res.json({
        error: false,
        message: `Update quiz ${_id} success`,
        data: quiz
    })
}
const deleteQuiz = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const quiz = await Quiz.findById(_id).exec()
    if (!quiz) {
        return res.status(400).json({
            error: true,
            message: "No Quiz found",
            data: null
        })
    }
    const delited = await quiz.deleteOne()

    res.json({
        error: false,
        message: `delited quiz with id ${_id}`,
        data: { quiz }
    })

}
const addQuestion = async (req, res) => {
    const { title, options, quizId } = req.body

    if (!title || !options || !quizId) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }

    const originQuiz = await Quiz.findById(quizId).exec()
    if (!originQuiz) {
        return res.status(400).json({
            error: true,
            message: "Error while orignle quiz",
            data: null
        })
    }
    const questions = [...originQuiz.questions, { title, options }]
    originQuiz.questions = questions
    const updateQuis = await originQuiz.save()

    res.status(201).json({
        error: false,
        message: `Add question success`,
        data: { updateQuis }
    })
}
const deleteQuestion = async (req, res) => {
    const { _id, quizId } = req.body
    if (!_id || !quizId) {
        return res.status(400).json({
            error: true,
            message: "Id and quisId is required",
            data: null
        })
    }
    const originQuiz = await Quiz.findById(quizId).exec()
    if (!originQuiz) {
        return res.status(400).json({
            error: true,
            message: "Error while orignle quiz",
            data: null
        })
    }
    const questions = originQuiz.questions.filter((q) => q._id != _id)
    originQuiz.questions = questions
    const updateQuiz = await originQuiz.save()

    res.json({
        error: false,
        message: `delited question with id ${_id} by question id  ${quizId}`,
        data: { questions }
    })
}
const updateQuestion = async (req, res) => {
    const { title, options, quizId, id } = req.body

    if (!title || !options || !quizId || !id) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }

    const originQuiz = await Quiz.findById(quizId).exec()
    if (!originQuiz) {
        return res.status(400).json({
            error: true,
            message: "Error while orignle quiz",
            data: null
        })
    }
    const questions = originQuiz.questions.map(q => {
        if (q?._id == id) {
            return { ...q, options, title }
        } return q;
    })

    // [...originQuiz.questions, { title, options }]
    originQuiz.questions = questions
    originQuiz.title = title

    const updateQuis = await originQuiz.save()

    res.status(201).json({
        error: false,
        message: `Add question success`,
        data: { updateQuis }
    })
}
const getAnswersByQuiz = async (req, res) =>{
    const {_id } = req.body

    if ( !_id) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }

    const quiz = await Quiz.findById(_id).lean()
    if (!quiz) {
        return res.status(400).json({
            error: true,
            message: "Error while orignle quiz",
            data: null
        })
    }
    // const question = quiz.questions.map(q => {
    //     if (q?._id == id) {
    //         return { ...q, options, title }
    //     } return q;
    // })
    
    const ans = quiz.questions.map(q=>{
        const a = q.options.find(o=>(o.isCorrect))
        console.log(a);
        return a.title
    })

    res.status(201).json({
        error: false,
        message: `get ans success`,
        data: {ans}
    })
}






module.exports = { getQuizzesInfo,getQuizzes, getQuizById, addQuiz, updateQuiz, deleteQuiz, addQuestion, deleteQuestion, updateQuestion ,getActiveQuizzes,getAnswersByQuestion: getAnswersByQuiz}