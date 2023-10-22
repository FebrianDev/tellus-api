const express = require('express')
const router = express.Router();
const {Post} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/post/trending', auth, async (req, res) => {

    const post = await Post.findAll({
        order: [['like', 'DESC'], ['comment', 'DESC']],
        limit: 10
    })
    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router