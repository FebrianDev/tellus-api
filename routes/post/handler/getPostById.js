const express = require('express')
const router = express.Router()
const {Post, Like, Bookmark} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/post/:id', auth, async (req, res) => {

    const idPost = req.params.id

    const post = await Post.findOne({
        include:[Like, Bookmark],
        where: {
            id: idPost
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router