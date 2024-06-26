const express = require("express")
const userQuizController = require("../controllers/userQuizController")
const router = express.Router()

router.post("/answers" , userQuizController.addAnswers)
router.post("/quiz" , userQuizController.getUserQuizzesByQuiz)
router.post("/user" , userQuizController.getAllUserQuizzesByUser)
router.get("/overview", userQuizController.getAdminOverview )
router.post("/UserOverview", userQuizController.getUserOverview)
router.get("/", userQuizController.getUserQuizzes )
router.get("/:id", userQuizController.getUserQuizById )
router.post("/" , userQuizController.addUserQuiz)
router.put("/", userQuizController.updateUserQuiz )
router.delete("/", userQuizController.deleteUserQuiz )

// router.delete("/questions", quizController.deleteQuestion )


module.exports = router