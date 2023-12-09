const express = require('express')
const router = express.Router();
const {Post, Like, Bookmark} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/post/all/trending', auth, async (req, res) => {

    const post = await Post.findAll({
        include:[Like, Bookmark],
        order: [['comment', 'DESC'], ['like', 'DESC']],
        limit: 10
    })

    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router