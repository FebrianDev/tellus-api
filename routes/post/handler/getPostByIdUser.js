const express = require('express')
const router = express.Router();
const {Post} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/post/user/:id_user', auth, async (req, res) => {

    const idUser = req.params.id_user

    const post = await Post.findAll({
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