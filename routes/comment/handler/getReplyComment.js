const express = require('express')
const router = express.Router()
const {ReplyComment} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/comment/reply/:id_post/:id_reply', auth, async (req, res) => {

    const {id_post,id_reply} = req.params

    const replyComment = await ReplyComment.findAll({
        where: {
            id_post: id_post,
            id_reply: id_reply,
        },
        order:[['id', 'DESC']]
    })
    res.json({
        status: 'success',
        code: 200,
        data: replyComment
    })
})

module.exports = router