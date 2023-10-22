const express = require('express')
const router = express.Router()
const {Post} = require("../../../models")
const auth = require('../../../middleware/auth')

router.put("/post/:id", auth, async (req, res) => {

    const idPost = req.params.id

    const post = req.body

    const postUpdate = await Post.update(
        {
            post_message: post.message,
            id_user: post.id_user,
            like: post.like,
            comment: post.comment,
            private_post: post.private_post,
            token: post.token,
            updatedAt: Date.now()
        }, {
            where: {
                id: idPost
            }
        })

    if (postUpdate[0] === 1) {
        return res.json({
            status: "success",
            code: 200,
        })
    } else {
        return res.json({
            status: "failed",
            code: 404,
        })
    }

})

module.exports = router
