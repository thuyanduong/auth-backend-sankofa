// Any logic that handles req and res should go in the Controller
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

async function getSingleUser (req, res) {
  const userId = req.params.id
  const user = await UserModel.getSingleUserFromDB(userId) 
  if(user) {
    const usersRobots = await UserModel.getUsersRobotsFromDB(userId)
    res.send({user, usersRobots})
  }else{
    res.status(404).send("User not found")
  }
}

async function register(req, res){
  const {username, password, bio} = req.body
  let hashedPassword = bcrypt.hashSync(password, 10)
  try{
    const user = await UserModel.postUserToDB(username, hashedPassword, bio)
    const usersRobots = await UserModel.getUsersRobotsFromDB(user.id)
    const token = jwt.sign({ id: user.id }, 'sankofa');
    res.send({user, token, usersRobots})
  }catch(error){
    res.status(400).send(error)
  }
}

async function login(req, res){
  const {username, password} = req.body
  let user = await UserModel.getUserByUsername(username)
  console.log(user)
  if(bcrypt.compareSync(password, user.password)){
    user = await UserModel.getSingleUserFromDB(user.id) 
    const usersRobots = await UserModel.getUsersRobotsFromDB(user.id)
    res.send({user, usersRobots})          
  }else{
    res.status(401).send("incorrect password")
  }
}


module.exports = {
  getSingleUser, 
  register,
  login
}