const express = require('express')
const { User} = require('../models')
const userRoute = express.Router()

userRoute.route('/')
    .get( async (req,res) => {
        try{
            const users = await User.find()
            console.log(`here ${users}`);
        }catch(err){
            console.log(err)
        }
    })


module.exports = {
    userRoute
}