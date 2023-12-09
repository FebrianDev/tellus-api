const express = require('express')
const router = express.Router()
const {Post} = require("../../../models")
const auth = require('../../../middleware/auth')

router.put("/post/:id", auth, async (req, res) => {

    const idPost = req.params.id

    const isPrivate = req.body.is_private

    const postUpdate = await Post.update(
        {
            is_private: isPrivate
        }, {
            where: {
                id: idPost
            }
        })

    if (postUpdate[0] === 1) {
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
