const express = require('express')
require("dotenv").config()
const connectDb=require("./config/db")
const cors=require("cors")
const auth=require("./routes/auth")
const todo=require("./routes/todo")
const app = express()



const {PORT = 8000}=process.env
app.use(express.json())

app.use(cors())
connectDb()

app.get('/', (req, res) => {
    const data=new Date().getHours()
  res.send(`Server is running on the port 8000 at this time ${data}`)
})

app.use("/todo",todo)
app.use("/auth",auth)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})