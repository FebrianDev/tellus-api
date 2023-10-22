const express = require('express')
const router = express.Router();
const {Post} = require('../../../models')
const auth = require('../../../middleware/auth')

router.get('/post/tag/:tag',auth, async (req,res)=>{

    const tag = req.params.tag

    const post = await Post.findAll({
        where:{
            tag:tag
        }
    })
    res.json({
        status:'success',
        code:200,
        data : post
    })
})

module.exports = router