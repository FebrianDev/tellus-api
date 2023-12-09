const express = require('express')
const router = express.Router()
const {Post, Comment, ReplyComment} = require('../../../models')
const auth = require('../../../middleware/auth')

router.delete('/post/:id', auth, async (req, res) => {

    const idPost = req.params.id

    const post = await Post.destroy({where: {id: idPost}})

    if (post) {

        const comment = await Comment.destroy({
            where: {id_post: idPost}
        })

        if (comment) {

            const replyComment = await ReplyComment.destroy({
                where: {id_post: idPost}
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