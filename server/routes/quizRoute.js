const express = require("express")
const quizController = require("../controllers/quizController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

router.get("/active", quizController.getActiveQuizzes )

// router.use(verifyJWT)
// router.use(verifyAdmin)

router.get("/", quizController.getQuizzes )
router.get("/:id", quizController.getQuizById )
router.post("/" , quizController.addQuiz)
router.put("/", quizController.updateQuiz )
router.delete("/", quizController.deleteQuiz )
router.post("/questions" , quizController.addQuestion)
router.delete("/questions", quizController.deleteQuestion )
router.put("/questions", quizController.updateQuestion )
router.post("/ans" , quizController.getAnswersByQuestion)




module.exports = router