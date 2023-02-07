# MVC Review (10 minutes)
- [MVC Diagram](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

## Set up (10 minutes)
1. Use your existing backend code with your migrations/seeds
2. `touch index.js` to create your main server file
3. `npm install express`
4. `npm start` script
5. Set up your server file and db file

```js
//index.js
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000 

app.get("/robots", (req, res) => {
  res.send("here are the robots")
})

app.listen(PORT, function(){
  console.log("Server started on port: ", PORT);
})
```

```js
//db.js
const { Pool } = require('pg')

const connectionLocal = {
  user: 'postgres',
  host: 'localhost',
  database: 'robotworkshop',
  password: 'postgres',
  port: 5432,
}

const connectionProduction = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {rejectUnauthorized: false}
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionLocal)

module.exports = pool
```

## Creating each API Endpoint
1. Start with the Router -> Controller -> Model

### GET `/robots` (20 minutes)
```js 
//robotRouter.js
const express = require('express')
const router = express.Router()
const {getAllRobots} = require("../controllers/robotsController")

router.get("/", getAllRobots)

module.exports = router
```

```js 
//index.js
const robotRouter = require("./routers/robotRouter")

app.use("/robots", robotRouter)
```

```js
//robotsController.js
const RobotModel = require("../models/robotModel")

const getAllRobots = async (req, res) => {
  const robots = await RobotModel.getRobotsFromDB()
  res.send(robots)
}

module.exports = {
  getAllRobots
}
```

```js
//robotModel.js
const pool = require("../db")

class RobotModel {
  static async getSingleRobotFromDB(id){
    let query = await pool.query("SELECT * FROM robots WHERE id = $1", [id])
    return query.rows
  }
}

module.exports = RobotModel
```

### GET `/users/:id` (20 minutes)
```js 
//userRouter.js
const express = require('express')
const router = express.Router()
const {getSingleUser} = require("../controllers/usersController")

router.get("/:id", getSingleUser)

module.exports = router
```

```js 
//index.js
const robotRouter = require("./routers/robotRouter")
const userRouter = require("./routers/userRouter")

app.use("/robots", robotRouter)
app.use("/users", userRouter)
```

```js
//usersController.js
const UserModel = require("../models/userModel")

const getSingleUser = async (req, res) => {
  const userID = req.params.id
  const user = await UserModel.getSingleUserFromDB(userID)
  const userRobots = await UserModel.getUsersRobotsFromDB(userID)
  res.send({user, userRobots})
}

module.exports = {
  getSingleUser
}
```

```js
//userModel.js
const pool = require("../db")

class UserModel { 
  static async getSingleUserFromDB(id){
    let query = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return query.rows
  }

  static async getUsersRobotsFromDB(id){
    let query = await pool.query("SELECT * FROM user_robots JOIN robots ON user_robots.robot_id = robots.id WHERE user_id = $1", [id])
    return query.rows
  }
}

module.exports = UserModel
```