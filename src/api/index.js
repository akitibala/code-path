const express = require('express')
const router = express.Router()
const { authRoute } = require('./auth')
const  { userRoute } = require('./user')
const { authenticateToken }   = require('../utils/auth')
router.use(authRoute)
router.use('/user',authenticateToken,userRoute)

module.exports =  { router }
