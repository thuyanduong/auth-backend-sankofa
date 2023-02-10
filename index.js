const express = require("express")
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8000 
const robotRouter = require("./routers/robotRouter")
const userRouter = require("./routers/userRouter")

//allow us to pull data from req.body
app.use(express.json())
app.use(cors())

//robotRouter -> robotController -> robotModel -> DB
app.use("/robots", robotRouter)

//userRouter -> userController -> userModel -> DB
app.use("/users", userRouter)

app.listen(PORT, function(){
  console.log("Server started on port: ", PORT);
})