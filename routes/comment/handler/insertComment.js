const express = require('express')
const Validator = require('fastest-validator')
const {Comment} = require('../../../models')

const auth = require("../../../middleware/auth")

const router = express.Router()
const v = new Validator()

//Insert Tweet
router.post('/comment', auth, async (req, res) => {
    const schema = {
        id_user: 'number|empty:false',
        id_post:'number|empty:false',
        message: 'string|empty:false',
        root:'boolean|empty:false',
        id_reply:'number|empty:false',
        token:"string|empty:false"
    }

    const validate= v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const data = {
        id_user: req.body.id_user,
        id_post: req.body.id_post,
        message: req.body.message,
        root: req.body.root,
        id_reply: req.body.id_reply,
        token:req.body.token
    }

    const insertComment = await Comment.create(data)

    return res.json({
        message: 'success',
        code: 201,
        data: {
            id: insertComment.id
        }
    })
})

module.exports = router