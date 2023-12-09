const express = require('express')
const Validator = require('fastest-validator')
const {Comment, Post} = require('../../../models')

const auth = require("../../../middleware/auth")

const router = express.Router()
const v = new Validator()

//Insert Tweet
router.post('/comment', auth, async (req, res) => {
    // const schema = {
    //     id_user: 'number|empty:false',
    //     id_post:'number|empty:false',
    //     message: 'string|empty:false',
    //     root:'boolean|empty:true',
    //     id_reply:'number|empty:true',
    //     token:"string|empty:false"
    // }
    //
    // const validate = v.validate(req.body, schema)
    //
    // if (validate.length) {
    //     return res.status(400).json({
    //         status: 'error',
    //         message: validate
    //     })
    // }

    const data = {
        id_user: req.body.id_user,
        id_post: req.body.id_post,
        message: req.body.message,
        token: req.body.token
    }

    const insertComment = await Comment.create(data)

    if (insertComment) {

        const post = await Post.findOne({where: {id: req.body.id_post}})

        const postUpdate = await Post.update({
            comment: post.comment + 1,
        }, {
            where: {
                id: data.id_post
            }
        })

        if (postUpdate) {
            return res.json({
                message: 'success',
                code: 201,
                data: {
                    id: insertComment.id
                }
            })
        } else {
            return res.json({
                status: "failed",
                code: 404,
            })
        }
    }

})

module.exports = router