const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const {User} = require('../../../models')

const {ACCESS_TOKEN_VERIFICATION} = process.env

const v = new Validator()

//verify account
router.post('/verify/:token', async (req, res) => {

    const {token} = req.params;

    // Verifying the JWT token
    jwt.verify(token, ACCESS_TOKEN_VERIFICATION, async function (err, decoded) {
        if (err) {
            console.log(err);
            res.status(400).json({
                    code: 400,
                    status: 'error',
                    message: 'Email verification failed, possibly the link is invalid or expired'
                }
            )
        } else {
            await User.update({
                active: true
            }, {
                where:{
                    id:req.body.id
                }
            })
            res.status(200).json({
                    code: 200,
                    status: 'success',
                    message: "Email verified successfully"
                }
            )
        }
    })
})

module.exports = router