const express = require('express')
const router = express.Router()
const {Comment} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/comment/:id_post', auth, async (req, res) => {

    const idPost = req.params.id_post

    const comment = await Comment.findAll({
        where: {
            id_post: idPost
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: comment
    })
})

module.exports = router