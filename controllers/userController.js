// Any logic that handles req and res should go in the Controller
const UserModel = require("../models/userModel")

async function getSingleUser (req, res) {
  const userId = req.params.id
  const user = await UserModel.getSingleUserFromDB(userId) //async
  const usersRobots = await UserModel.getUsersRobotsFromDB(userId)
  res.send({user, usersRobots})
}

async function getAllUsers(req, res){
  const users = await UserModel.getAllUsersFromDB()
  res.send(users)
}

module.exports = {
  getSingleUser, 
  getAllUsers
}