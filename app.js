//require module library
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

const {
    PORT
} = process.env

//require module file
const {
    register,
    verify,
    login,
    sendReset,
    resetReset,
    updateToken,
    getApiToken
} = require('./routes/auth/auth')
const {
    getAllPost,
    getPostById,
    getPostByIdUser,
    getTrendingPost,
    getPostByTag,
    insertPost,
    updatePost,
    updatePrivatePost,
    deletePost
} = require('./routes/post/post')

const {
    getCommentByPost, getReplyComment, insertComment, insertReplyComment, deleteComment, deleteReplyComment
} = require('./routes/comment/comment')

const {getAllBookmark, insertBookmark, getBookmarkById} = require('./routes/bookmark/bookmark')

const {
    insertLike
} = require('./routes/like/like')

//initialize
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({secret: "Your secret key"}))
app.use(cors({
    origin: '*'
}))

app.use(cookieParser())

app.use('/api', register, verify, login, sendReset, resetReset, updateToken, getApiToken,
    getAllPost, getPostById, getPostByIdUser, getTrendingPost, getPostByTag, insertPost, updatePost, updatePrivatePost, deletePost,
    getCommentByPost, getReplyComment, insertComment, insertReplyComment, deleteComment, deleteReplyComment,
    getAllBookmark, insertBookmark, getBookmarkById,
    insertLike
)

module.exports = app
app.listen(PORT)