const express = require('express')
const { User} = require('../models')
const userRoute = express.Router()

userRoute.route('/')
    .get( async (req,res) => {
        try{
            const { userId } = req.body
            const user = await User.findOne( { id:userId})
            console.log(`authenticated ${user}`);
            res.send(`Welcome ${user.username}`).status(200)
        }catch(err){
            console.log(err)
        }
    })


module.exports = {
    userRoute
}