// Any logic that handles req and res should go in the Controller

const RobotModel = require("../models/robotModel")

const getAllRobots = async (req, res) => {
  // get all robots from MODEL
  const allRobots = await RobotModel.getAllRobotsFromDB() //async
  res.send(allRobots)
}


module.exports = {
  getAllRobots
}

