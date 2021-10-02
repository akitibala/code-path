const express = require('express')
const { Path} = require('../models')
const pathRouter = express.Router()

pathRouter.route('/')
    .post(async (req,res) => {
        const { title , description } = req.body
        try{
            const path = new Path({
                title,
                description
            })
            const pathRes = await path.save()
            console.log(pathRes);
        }
        catch(err){
            console.error(err)
            res.send(400)
        }
    })

module.exports ={ pathRouter }