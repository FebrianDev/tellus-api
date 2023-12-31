const express = require('express')
const router = express.Router()
const {User} = require("../../../models")
const auth = require('../../../middleware/auth')

router.put("/token/:id", auth, async (req, res) => {

    const idUser = req.params.id

    const token = req.body.token

    const userUpdate = await User.update(
        {
            fcm_token: token
        }, {
            where: {
                id: idUser
            }
        })

    if (userUpdate[0] === 1) {
        return res.json({
            status: "success",
            code: 200,
        })
    } else {
        return res.json({
            status: "failed",
            code: 404,
        })
    }

})

module.exports = router
