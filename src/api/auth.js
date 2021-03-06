const express = require('express')
// const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User} = require('../models')
const { hashPassword ,generateToken } = require('../utils/auth')
const authRoute = express.Router()

authRoute.route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        res.status(401).send('Invalid Login Credentials')
      }

      const token = generateToken(user._id)

      let payload = {
        // id: user._id,
        // username: user.username,
        // email: user.email,
        token
      }
      // res.redirect(302,'/')
      res.send(payload).status(200)
     
    } catch (err) {
      console.error(err)
    }
  })

authRoute.route('/register')
  .post(async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body)

    try {
      if (password.length >= 8) {
        const hash = await hashPassword(password)
        const user = new User({
          username,
          email,
          password: hash
        })
        const userRes = await user.save()
        console.log(userRes)

        // const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
        // const verification = new Verification({
        //   userId: userRes._id,
        //   code
        // })
        // await verification.save()

        // const payload = {
        //   code,
        //   email
        // }
        // await sendEmail(payload)
        res.send(`${username} Registered Successfully`).status(201)
      } else {
        res.send('Invalid credentials').status(400)
      }
    } catch(err) {
      console.error(err)
      res.send(400)
    }
  })

  authRoute.route('/logout')
    .post(async(req,res) =>{
      console.log('check for logout')
    })
// userRoute.route('/verify')
//   .post(async (req, res) => {
//     const { email, code } = req.body

//     try {
//       const user = await User.findOne({ email })
//       const verify = await Verification.findOne({ userId: user._id })

//       if (verify.code === parseInt(code)) {
//         user.isVerified = true
//         await user.save()
//         res.send('Verified')
//         return true
//       } else {
//         res.status(400).send('Invalid Code')
//       }
//     } catch (err) {
//       res.status(400).send('Invalid Code')
//     }
//   })

// userRoute.route('/logout')

module.exports =  { authRoute }