if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
    //const bodyParser = require("body-parser")
    // Import routes
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")
const verifyMiddleware = require("./routes/verifyToken")

//Mongoose
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log("Connected to DB")
})

//Middlewares
app.use(express.json())


//Route middlewares
app.use('/api/user', authRouter) //Goes to /api/user/reg,log,...
app.use('/api/posts', verifyMiddleware)
app.use('/api/posts', postRouter)

//Listen on port
app.listen(3000)