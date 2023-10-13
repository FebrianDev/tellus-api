//require module
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({secret: "Your secret key"}))
app.use(cors({
    origin: '*'
}))

app.use(cookieParser())

app.use('/api', async (req, res) => {
    return res.send(200, "OK!")
})

module.exports = app
app.listen(3030)