const express = require('express')
const authRouter = express.Router()
const authcontroller = require('../controller/auth.controller')
const authmiddleware = require('../middleware/auth.middleware')

authRouter.post('/register',authcontroller.registerusercontroller)

authRouter.post('/login',authcontroller.loginusercontroller)

authRouter.get('/logout',authcontroller.logoutusercontroller )

authRouter.get('/getme', authmiddleware.authUser,authcontroller.getmecontroller)

module.exports = authRouter
