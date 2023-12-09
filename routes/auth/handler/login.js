const bcrypt = require('bcrypt')
const {User} = require('../../../models')
const Validator = require('fastest-validator')

const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()

const {ACCESS_TOKEN} = process.env

const v = new Validator()

router.post('/login', async (req, res) => {

    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json({
            code: 404,
            status: 'error',
            data: validate
        })
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    console.log(user)
    if (!user) {
        return res.status(404).json({
            code: 404,
            status: 'error',
            message: 'user not found'
        })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'password wrong!'
        })
    }

    if (user.active === 0 || user.active === false) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'Your account has been not activated!'
        })
    }

    // Create token
    const token = jwt.sign(
        {email: req.body.email}, ACCESS_TOKEN,
        {
            expiresIn: "365d",
        }
    )

    await User.update({
        token: token
    }, {
        where: {
            id: user.id
        }
    })

    res.json({
        code: 200,
        status: 'success',
        data: {
            id: user.id,
            token: token
        }
    })
})

module.exports = router