const express = require('express');
const {connection} = require("./db")
const {userRoute} = require("./routes/user.routes")
const {noteRoute} = require("./routes/note.routes")
const {auth} = require("./middleware/auth.middleware")
const cors  = require("cors")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/users",userRoute)
app.use(auth)
app.use("/notes",noteRoute)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connection to database has been established successfully")
    } catch (error) {
        console.log(error)
        console.log("Unable to connect to database")
    }
    console.log(`Server is running on port ${process.env.port}`)
})