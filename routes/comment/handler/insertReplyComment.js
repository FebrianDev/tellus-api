const express = require('express')
const Validator = require('fastest-validator')
const {ReplyComment, Post} = require('../../../models')

const auth = require("../../../middleware/auth")

const router = express.Router()
const v = new Validator()

//Insert Tweet
router.post('/comment/reply', auth, async (req, res) => {

    const data = {
        id_user: req.body.id_user,
        id_post: req.body.id_post,
        message: req.body.message,
        prev_message:req.body.prev_message,
        is_root: req.body.is_root,
        id_reply: req.body.id_reply,
        token: req.body.token
    }

    const insertReplyComment = await ReplyComment.create(data)

    if (insertReplyComment) {

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
                    id: insertReplyComment.id
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