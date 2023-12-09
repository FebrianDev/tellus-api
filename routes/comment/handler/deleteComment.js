const express = require('express')
const router = express.Router()
const {Comment, Post, ReplyComment} = require('../../../models')
const auth = require('../../../middleware/auth')

router.delete('/comment/:id_post/:id_comment', auth, async (req, res) => {

    const {id_post, id_comment} = req.params

    console.log(id_post + id_comment)

    const post = await Post.findOne({where: {id: id_post}})

    const postUpdate = await Post.update(
        {
            comment: post.comment - 1,
        }, {
            where: {
                id: id_post
            }
        })

    if (postUpdate) {

        const comment = await Comment.destroy({where: {id: id_comment}})

        if (comment) {

            const replyComment = await ReplyComment.destroy({
                where: {id_reply: id_comment}
            })

            if (replyComment) {
                res.json({
                    status: 'success',
                    code: 200
                })
            } else {
                res.json({
                    status: 'failed',
                    code: 404
                })
            }
        } else {
            res.json({
                status: 'failed',
                code: 404
            })
        }
    } else {
        res.json({
            status: 'failed',
            code: 404
        })
    }
})

module.exports = router