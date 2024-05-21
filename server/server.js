require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDb")
const { default: mongoose } = require("mongoose")
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 7001
const app = express()
connectDB()

//middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/users",require('./routes/userRoute'))
app.use("/api/quizzes",require('./routes/quizRoute'))
app.use("/api/userQuizzes",require('./routes/userQuizRoute'))

//routes
app.get("/", (req, res) => {
    res.send("Home page")
})

mongoose.connection.once("open", () => {
    console.log('Conccted to mongoDB');
    app.listen(PORT, () => {
        console.log(`Server is runnong on port ${PORT}`);
    })
})
mongoose.connection.on('error', err => {
    console.log("Connect to db error");
    console.log(err);
})
