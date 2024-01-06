const express = require('express')
const router = express.Router()
const {User} = require('../../../models')
const auth = require('../../../middleware/auth')
router.get('/api-token/:id', auth, async (req, res) => {

    const idUser = req.params.id

    const user = await User.findOne({
        where: {
            id: idUser
        }
    })
    res.json({
        status: 'success',
        code: 200,
        data: {
            token: user.token
        }
    })
})

module.exports = router