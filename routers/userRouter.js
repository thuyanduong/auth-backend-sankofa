const express = require("express")
const router = express.Router()
const {getSingleUser} = require("../controllers/userController")

router.get('/:id', getSingleUser)

module.exports = router