// Router handles all requests that start with /robots

const express = require("express")
const router = express.Router();
const {getAllRobots} = require("../controllers/robotController")

// Endpoint: /robots
router.get("/", getAllRobots)

// GET /robots/:id

// POST /robots

module.exports = router