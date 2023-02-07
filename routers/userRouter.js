const express = require("express")
const router = express.Router()
const {getSingleUser, getAllUsers} = require("../controllers/userController")

router.get('/:id', getSingleUser)

router.get('/', getAllUsers)

module.exports = router