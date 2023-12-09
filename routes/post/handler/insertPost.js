const express = require('express')
const Validator = require('fastest-validator')
const {Post} = require('../../../models')

const auth = require("../../../middleware/auth")

const router = express.Router()
const v = new Validator()

//Insert Post
router.post('/post',  auth, async (req, res) => {
    const schema = {
        message: 'string|empty:false',
        id_user: 'string|empty:false',
        tag:'string|empty:false',
        is_private: 'boolean|empty:false',
        token: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const data = {
        message: req.body.message,
        id_user: req.body.id_user,
        like: 0,
        comment: 0,
        tag:req.body.tag,
        is_private: req.body.is_private,
        token: req.body.token
    }

    const insertPost = await Post.create(data)

    return res.json({
        message: 'success',
        code: 201,
        data: {
            id: insertPost.id
        }
    })
})

module.exports = router