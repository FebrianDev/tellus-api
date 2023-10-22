const express = require('express')
const router = express.Router();
const {Like} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/like', auth, async (req, res) => {

    const like = await Like.findAll({
        where: {
            id_user: req.body.id_user,
            id_post: req.body.id_post
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: like
    })
})

module.exports = router