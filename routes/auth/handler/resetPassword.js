const {User, ResetPassword} = require('../../../models')
const Validator = require('fastest-validator')

const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

const v = new Validator()

router.post('/reset-password', async (req, res) => {

    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6',
        code: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            code: 404,
            status: 'error',
            data: validate
        })
    }

    const user = await ResetPassword.findOne({
        where: {
            email: req.body.email,
            code: req.body.code
        }
    })

    if (!user) {
        return res.status(404).json({
            code: 404,
            status: 'error',
            message: 'Code verification is wrong!'
        })
    }

    const newPassword = await bcrypt.hash(req.body.password, 10)

    const updatePassword = await User.update({
        password: newPassword
    }, {
        where: {
            email: req.body.email
        }
    })

    if(updatePassword){
        const destroy = await ResetPassword.destroy({where: {email: req.body.email}})
        if(destroy) {
            res.json({
                code: 200,
                status: 'success',
                data: {
                    id: user.id,
                }
            })
        }else{
            return res.json({
                status: "failed",
                code: 404,
            })
        }
    }else{
        return res.json({
            status: "failed",
            code: 404,
        })
    }

})

module.exports = router