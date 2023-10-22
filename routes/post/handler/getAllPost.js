const express = require('express')
const router = express.Router()
const {Post} = require('../../../models')
const auth = require("../../../middleware/auth")

router.get('/post', auth, async (req, res) => {

    const post = await Post.findAll()
    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router