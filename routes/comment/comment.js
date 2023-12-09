const getCommentByPost = require('../comment/handler/getCommentByPost')
const getReplyComment = require('../comment/handler/getReplyComment')
const insertComment = require('../comment/handler/insertComment')
const insertReplyComment = require('../comment/handler/insertReplyComment')
const deleteComment = require('../comment/handler/deleteComment')
const deleteReplyComment = require('../comment/handler/deleteReplyComment')
module.exports = {
    getCommentByPost,
    getReplyComment,
    insertComment,
    insertReplyComment,
    deleteComment,
    deleteReplyComment
}