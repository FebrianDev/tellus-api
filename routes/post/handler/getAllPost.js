const express = require('express')
const router = express.Router()
const {Post, Like, Bookmark} = require('../../../models')
const auth = require("../../../middleware/auth")

router.get('/post', auth, async (req, res) => {

    const post = await Post.findAll({
        include:[Like, Bookmark],
        where: {
            is_private:false
        },
        order:[['id']]
    })

    //const query = Post.query("Select * from posts")

    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router