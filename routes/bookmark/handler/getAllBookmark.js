const express = require('express')
const router = express.Router()
const {Bookmark} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/bookmark/:id_user', auth, async (req, res) => {

    const idUser = req.params.id_user

    const bookmark = await Bookmark.findAll({
        where: {
            id_user: idUser
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: bookmark
    })
})

module.exports = router