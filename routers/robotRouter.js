// Router handles all requests that start with /robots

const express = require("express")
const router = express.Router();
const {getAllRobots, getSingleRobot} = require("../controllers/robotController")

router.get("/", getAllRobots)

router.get("/:id", getSingleRobot)

module.exports = router