const express = require('express')
const router = express.Router()
const { authRoute } = require('./auth')
const  { userRoute } = require('./user')
const { pathRouter } = require('./path')
const { authenticateToken }   = require('../utils/auth')
router.use(authRoute)
router.use('/user',authenticateToken,userRoute)
router.use('/path',authenticateToken,pathRouter)

module.exports =  { router }
