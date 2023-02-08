const express = require("express")
const router = express.Router()
const {getSingleUser, register, login} = require("../controllers/userController")

router.get('/:id', getSingleUser)
router.post('/register', register)
router.post("/login", login)

module.exports = router