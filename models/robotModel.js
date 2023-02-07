const pool = require("../db")

class RobotModel {

  static async getAllRobotsFromDB(){
    const query = await pool.query("SELECT * FROM robots;")
    return query.rows //THIS IS our robots data
  }

  //static getSingleRobotFromDB

}

module.exports = RobotModel