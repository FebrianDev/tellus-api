//require module library
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//require module file
const {register, verify, login, sendReset, resetReset} = require('./routes/auth/auth')
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
    getLikeById, insertLike
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

app.use('/api', register, verify, login, sendReset,resetReset,
    getAllPost, getPostById, getPostByIdUser, getTrendingPost, getPostByTag, insertPost, updatePost, updatePrivatePost, deletePost,
    getCommentByPost, getReplyComment, insertComment, insertReplyComment, deleteComment, deleteReplyComment,
    getAllBookmark, insertBookmark, getBookmarkById,
    getLikeById, insertLike
)

module.exports = app
app.listen(3030)