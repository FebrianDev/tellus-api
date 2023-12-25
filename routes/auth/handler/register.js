const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const {User} = require('../../../models')
const sendEmail = require('../utils/email');

const {ACCESS_TOKEN} = process.env

const v = new Validator()

//Create data
router.post('/register', async (req, res) => {

    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6',
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({where: {email: req.body.email}})

    if (user) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'email already exist'
        })
    }

    const password = await bcrypt.hash(req.body.password, 10)

    // Create token
    const token = jwt.sign(
        {email: req.body.email}, ACCESS_TOKEN,
        {
            expiresIn: "365d",
        }
    )

    const data = {
        password: password,
        email: req.body.email,
        token: token
    }

    const createUser = await User.create(data)


    return res.status(201).json({
        code: 201,
        status: 'success',
        data: {
            id: createUser.id,
            token:token
        }
    })

})

module.exports = router