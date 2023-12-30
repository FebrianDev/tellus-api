const register = require('../auth/handler/register')
const verify = require('../auth/handler/verify')
const login = require('../auth/handler/login')
const sendReset = require('../auth/handler/sendResetPassword')
const resetReset = require('../auth/handler/resetPassword')
module.exports = {register, verify, login, sendReset, resetReset}