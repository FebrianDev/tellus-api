//require module library
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//require module file
const {register, verify, login} = require("./routes/auth/auth")

//initialize
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({secret: "Your secret key"}))
app.use(cors({
    origin: '*'
}))

app.use(cookieParser())

app.use('/api', register, verify, login)

module.exports = app
app.listen(3030)