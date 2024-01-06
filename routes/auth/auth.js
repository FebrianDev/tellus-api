const register = require('../auth/handler/register')
const verify = require('../auth/handler/verify')
const login = require('../auth/handler/login')
const sendReset = require('../auth/handler/sendResetPassword')
const resetReset = require('../auth/handler/resetPassword')
const updateToken = require("../auth/handler/updateToken")
const getApiToken = require("../auth/handler/getApiToken")
module.exports = {register, verify, login, sendReset, resetReset, updateToken, getApiToken}