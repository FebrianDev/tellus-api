const express = require('express')
const router = express.Router()
const {ReplyComment} = require('../../../models')
const auth = require('../../../middleware/auth')

router.delete('/comment/:id_reply', auth, async (req, res) => {

    const idReplyComment = req.params.id_reply

    const replyComment = await ReplyComment.destroy({
        where: {id: idReplyComment}
    })

    if (replyComment) {
        res.json({
            status: 'success',
            code: 200
        })
    } else {
        res.json({
            status: 'failed',
            code: 404
        })
    }


})

module.exports = router