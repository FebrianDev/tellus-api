const express = require('express')
const Validator = require('fastest-validator')
const {Like, Post} = require('../../../models')

const auth = require("../../../middleware/auth")

const router = express.Router()
const v = new Validator()

router.post('/like', auth, async (req, res) => {
    const schema = {
        id_user: 'string|empty:false',
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

    const post = await Post.findOne({where: {id: req.body.id_post}})

    const checkData = await Like.count({where: {id_user: req.body.id_user, id_post: req.body.id_post}})
        .then(count => {
            return (count > 0)
        })

    console.log(checkData)

    if (checkData) {
        await Like.destroy({where: {id_user: req.body.id_user, id_post: req.body.id_post}})

        const postUpdate = await Post.update(
            {
                like: post.like - 1,
            }, {
                where: {
                    id: req.body.id_post
                }
            })

        console.log(postUpdate)

        if (postUpdate[0] === 1) {
            return res.status(201).json({
                message: 'success',
                code: 200,
            })
        } else {
            return res.json({
                status: "failed",
                code: 404,
            })
        }
    } else {
        const insertLike = await Like.create(data)

        const postUpdate = await Post.update(
            {
                like: post.like + 1,
            }, {
                where: {
                    id: req.body.id_post
                }
            })
 
        if (postUpdate[0] === 1) {
            return res.json({
                status: "success",
                code: 201,
                data: {
                    id: insertLike.id
                }
            })
        } else {
            return res.json({
                status: "failed",
                code: 404,
            })
        }
    }

})

module.exports = router