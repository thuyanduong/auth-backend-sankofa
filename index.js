const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000 
const robotRouter = require("./routers/robotRouter")
const userRouter = require("./routers/userRouter")

//robotRouter -> robotController -> robotModel -> DB
app.use("/robots", robotRouter)

//userRouter -> userController -> userModel -> DB
app.use("/users", userRouter)

app.listen(PORT, function(){
  console.log("Server started on port: ", PORT);
})