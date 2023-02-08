const pool = require("../db");

class UserModel {
  static async getSingleUserFromDB(userId){
    const query = await pool.query("SELECT id, username, bio FROM users WHERE id = $1", [userId])
    return query.rows[0]
  }

  static async getUsersRobotsFromDB(userId){
    let query = await pool.query("SELECT * FROM user_robots JOIN robots ON user_robots.robot_id = robots.id WHERE user_id = $1", [userId])
    return query.rows
  }

  static async postUserToDB(username, password, bio){
    let query = await pool.query(
      "INSERT INTO users (username, bio, password) VALUES ($1, $2, $3) RETURNING id, username, bio;", 
      [username, bio, password]
    )
    return query.rows[0]    //return the new user that's been added to the DB
  }

  static async getUserByUsername(username){
    let query = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    return query.rows[0]
  }
}

module.exports = UserModel