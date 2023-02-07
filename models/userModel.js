const pool = require("../db");

class UserModel {
  static async getSingleUserFromDB(userId){
    const query = await pool.query("SELECT * FROM users WHERE id = $1", [userId])
    return query.rows[0]
  }

  static async getUsersRobotsFromDB(userId){
    let query = await pool.query("SELECT * FROM user_robots JOIN robots ON user_robots.robot_id = robots.id WHERE user_id = $1", [userId])
    return query.rows
  }

  static async getAllUsersFromDB(){
    let query = await pool.query("SELECT * FROM users;")
    return query.rows
  }
}

module.exports = UserModel