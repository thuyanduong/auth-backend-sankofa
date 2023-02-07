// Any logic that handles req and res should go in the Controller

const RobotModel = require("../models/robotModel")

const getAllRobots = async (req, res) => {
  const allRobots = await RobotModel.getAllRobotsFromDB() //async
  res.send(allRobots)
}

const getSingleRobot = async(req, res) => {
  const robotId = req.params.id
  const robot = await RobotModel.getSingleRobotFromDB(robotId)
  res.send(robot)
}

module.exports = {
  getAllRobots,
  getSingleRobot,
}

