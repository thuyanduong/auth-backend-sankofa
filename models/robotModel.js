const pool = require("../db")

class RobotModel {

  static async getAllRobotsFromDB(){
    const query = await pool.query("SELECT * FROM robots;")
    return query.rows 
  }

  static async getSingleRobotFromDB(robotId){
    const query = await pool.query("SELECT * FROM robots WHERE id = $1", [robotId])
    return query.rows[0]
  }

}

module.exports = RobotModel