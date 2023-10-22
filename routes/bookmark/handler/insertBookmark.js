const express = require('express')
const Validator = require('fastest-validator')
const {Bookmark} = require('../../../models')

const auth = require("../../../middleware/auth")

const router = express.Router()
const v = new Validator()

router.post('/bookmark', auth, async (req, res) => {
    const schema = {
        id_user: 'number|empty:false',
        id_post: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const data = {
        id_user: req.body.id_user,
        id_post: req.body.id_post,
    }

    const checkData = await Bookmark.count(
        {
            where: {id_user: req.body.id_user, id_post: req.body.id_post}
        })
        .then(count => {
            return (count > 0)
        })

    console.log("Check Data "+checkData)

    if (checkData) {
        await Bookmark.destroy({where: {id_user: req.body.id_user, id_post: req.body.id_post}})

        return res.status(201).json({
            message: 'success',
            code: 200,
        })
    } else {
        const insertBookmark = await Bookmark.create(data)

        return res.status(201).json({
            message: 'success',
            code: 201,
            data: {
                id: insertBookmark.id
            }
        })
    }

})

module.exports = router