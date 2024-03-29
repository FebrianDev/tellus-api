const express = require('express')
const router = express.Router();
const {Post, Like, Bookmark} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/post/tag/:tag', auth, async (req, res) => {

    const tag = req.params.tag

    const post = await Post.findAll({
        include: [Like, Bookmark],
        where: {
            tag: tag
        },
        order: [['id', 'DESC']]
    })
    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router