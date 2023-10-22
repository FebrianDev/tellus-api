const express = require('express')
const router = express.Router()
const {Comment} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/comment/reply/ :id', auth, async (req, res) => {

    const idComment = req.params.id

    const comment = await Comment.findAll({
        where: {
            id: idComment,
            id_reply: idComment
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: comment
    })
})

module.exports = router