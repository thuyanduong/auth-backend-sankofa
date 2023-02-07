const express = require("express")
const router = express.Router()
const {getSingleUser} = require("../controllers/userController")

router.get('/:id', getSingleUser)

//not going to build this out in class
router.get('/', (req, res) => {
  res.send("You are looking for a ALL OF THE users")
})

module.exports = router