const express = require('express')
const router = express.Router();
const {Like} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/like/:id_post/:id_user', auth, async (req, res) => {

    const {id_post, id_user} = req.params

    const like = await Like.findOne({
        where: {
            id_user: id_user,
            id_post: id_post
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: like
    })
})

module.exports = router