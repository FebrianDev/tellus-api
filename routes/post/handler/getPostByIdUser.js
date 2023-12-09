const express = require('express')
const router = express.Router();
const {Post, Like, Bookmark} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/post/user/:id_user', auth, async (req, res) => {

    const idUser = req.params.id_user

    console.log(idUser)

    const post = await Post.findAll({
        include:[Like, Bookmark],
        where: {
            id_user: idUser
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: post
    })
})

module.exports = router