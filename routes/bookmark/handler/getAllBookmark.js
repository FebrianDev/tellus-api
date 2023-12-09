const express = require('express')
const router = express.Router()
const {Bookmark, Post, Like} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/bookmark/:id_user', auth, async (req, res) => {

    const idUser = req.params.id_user

    const post = await Post.findAll({
        include:[Like, Bookmark],
        order:[['id']]
    })

    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router