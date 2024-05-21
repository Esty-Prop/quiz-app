const express = require("express")
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()

// router.use(verifyJWT)
// router.use(verifyAdmin)

router.get("/", userController.getUsers )
router.get("/:id", userController.getUserById )
router.post("/" , userController.addUser)
router.put("/", userController.updateUser )
router.delete("/", userController.deleteUser )

module.exports = router