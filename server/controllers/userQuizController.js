const UserQuiz = require("../models/UserQuiz")
const Quiz = require("../models/Quiz")

const getUserQuizzes = async (req, res) => {
    const userQuizzes = await UserQuiz.find({}, {}).populate('user').populate('quiz').lean()
    if (!userQuizzes.length) {
        return res.status(400).json({
            error: true,
            message: "No userQuizzes",
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: userQuizzes,
    })
}
const getUserQuizById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const userQuiz = await UserQuiz.findById(id, {}).populate("user").populate("quiz").lean()
        if (!userQuiz) return res.status(404).json("No userQuiz found")
        res.json({
            error: false,
            message: "",
            data: { userQuiz }
        })

    }
    catch (err) {
        console.log('jjjjjjjjjjjjjjjjjjjj');
        res.send("aaaaaaaaaaaa")
    }
}
const getAllUserQuizzesByUser = async (req, res) => {
    const { userId } = req.body
    const userQuizzes = await UserQuiz.find({user: userId}, {}).populate("quiz").lean()
    if (!userQuizzes.length) {
        return res.json({
            error: false,
            message: 'no quizzes',
            data: [],
        })
    }
    res.json({
        error: false,
        message: '',
        data: userQuizzes,
    })
}
const addUserQuiz = async (req, res) => {
    const { quiz, user } = req.body
    //validation
    if (!quiz || !user) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const uniqueUserQuiz = await UserQuiz.findOne({ quiz: quiz, user:user }).lean()
    if (uniqueUserQuiz) {
        return res.status(409).json({
            error: true,
            message: "Duplicate userQuiz",
            data: null
        })
    }
    const userQuiz = await UserQuiz.create({ quiz, user })
    if (!userQuiz) {
        return res.status(400).json({
            error: true,
            message: "Error while adding new userQuiz",
            data: null
        })
    }
    res.status(201).json({
        error: false,
        message: `Add userQuiz success`,
        data: { userQuiz }
    })
}
const updateUserQuiz = async (req, res) => {
    const { _id, quiz, answers, user, score } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const userQuiz = await UserQuiz.findById(_id).exec()
    if (!userQuiz) {
        return res.status(400).json({
            error: true,
            message: "No UserQuiz found",
            data: null
        })
    }

    quiz? userQuiz.quiz = quiz :""
    user? userQuiz.user = user:""
    answers? userQuiz.answers = answers:""
    score? userQuiz.score = score:""


    const updateUserQuiz = await userQuiz.save()
    res.json({
        error: false,
        message: `Update userQuiz ${_id} success`,
        data: userQuiz
    })
}
const deleteUserQuiz = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const userQuiz = await UserQuiz.findById(_id).exec()
    if (!userQuiz) {
        return res.status(400).json({
            error: true,
            message: "No UserQuiz found",
            data: null
        })
    }
    const delited = await userQuiz.deleteOne()

    res.json({
        error: false,
        message: `delited userQuiz with id ${_id}`,
        data: { userQuiz }
    })

}
const addAnswers = async (req, res) => {
    const { answers, userQuizId } = req.body
    if (!answers || !userQuizId) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const originUserQuiz = await UserQuiz.findById(userQuizId).populate('quiz').exec()
    // console.log(originUserQuiz);
    // const originQuiz = await Quiz.findById(originUserQuiz.quiz).lean()
    const originQuiz = originUserQuiz.quiz
    if (originQuiz?.questions?.length != answers.length) {
        return res.status(400).json({
            error: true,
            message: "Error with lentgh of answers",
            data: null
        })
    }
    if (!originUserQuiz || !originQuiz) {
        return res.status(400).json({
            error: true,
            message: "Error while orignle userQuiz or qiuz",
            data: null
        })
    }
    let setAnswers = []
    let isCorrect = false;
    for (let i = 0; i < answers.length; i++) {
        isCorrect = (originQuiz.questions[i]?.options.find((op) => op.title === answers[i])?.isCorrect) ? true : false
        setAnswers = [...setAnswers, { answer: answers[i], isCorrect: isCorrect, ques: originQuiz.questions[i].title }]
    }
    const score = setScore(setAnswers)

    originUserQuiz.answers = setAnswers
    originUserQuiz.score = Math.round(score)
    originUserQuiz.complated = true

    const updateQuis = await originUserQuiz.save()
    console.log('0')
    res.status(201).json({
        error: false,
        message: `Add answers success`,
        data: { updateQuis }
    })
}
const setScore =  (answers) => {
    let correntAns = 0
    answers.forEach(ans => {
        console.log(ans);
        if (ans.isCorrect) {
            correntAns++
        }
    });
    console.log(correntAns);
    console.log(100 / answers.length);
    return (100 / answers.length) * correntAns
}

module.exports = {getAllUserQuizzesByUser, getUserQuizzes, getUserQuizById, addUserQuiz, updateUserQuiz, deleteUserQuiz, addAnswers }