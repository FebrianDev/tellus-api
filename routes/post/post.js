const getAllPost = require('../post/handler/getAllPost')
const getPostById = require('../post/handler/getPostById')
const getPostByIdUser = require('../post/handler/getPostByIdUser')
const getTrendingPost = require('../post/handler/getTrendingPost')
const getPostByTag = require('../post/handler/getPostByTag')
const insertPost = require('../post/handler/insertPost')
const updatePost = require('../post/handler/updatePost')
const deletePost = require('../post/handler/deletePost')
module.exports = {
    getAllPost,
    getPostById,
    getPostByIdUser,
    getTrendingPost,
    getPostByTag,
    insertPost,
    updatePost,
    deletePost
}