const express = require('express')
const router = express.Router();
const {Bookmark} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/bookmark', auth, async (req, res) => {

    const bookmark = await Bookmark.findAll({
        where: {
            id_user: req.body.id_user,
            id_post: req.body.id_post
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: bookmark
    })
})

module.exports = router