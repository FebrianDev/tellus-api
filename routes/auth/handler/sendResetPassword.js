const express = require('express')
const router = express.Router()
const Validator = require('fastest-validator')
const {ResetPassword, User} = require('../../../models')
const sendEmail = require('../utils/email')
const {where} = require("sequelize");

const {ACCESS_TOKEN} = process.env

const v = new Validator()

//Create data
router.post('/send-reset', async (req, res) => {

    const schema = {
        email: 'email|empty:false',
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: validate
        })
    }

    const resetPassword = await ResetPassword.findOne({where: {email: req.body.email}})

    if (resetPassword) {
        await ResetPassword.destroy({
            where: {email: req.body.email}
        })
    }

    const randomNumbers = Array.from({length: 4}, () => getRandomInt(1, 10))

    const codeNumber = randomNumbers.map(num => num.toString()).join('')
    const codeNumberEmail = randomNumbers.map(num => num.toString()).join(' ')

    await sendEmail(req.body.email, codeNumberEmail)

    const data = {
        email: req.body.email,
        code: codeNumber
    }

    const createSendCode = await ResetPassword.create(data)

    return res.status(201).json({
        code: 201,
        status: 'success',
        data: {
            code: createSendCode.code
        }
    })

})

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

module.exports = router