const express = require('express')
const { Path ,Module,Section} = require('../models')
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

pathRouter.route('/:pathId/modules')
    .post(async(req,res) =>{
    const  { pathId } = req.params
    const { title , description } = req.body
    try{
        const module = new Module({
            title,
            description
        })
        const moduleRes = await module.save()
        const doc = await Path.findOne({id:pathId})
        doc.modules.push(moduleRes) 
        console.log(moduleRes);
    }
    catch(err){
        console.log(err)
    }

    })


pathRouter.route('/:pathId/modules/:moduleId/section')
    .post( async (req,res) => {
        const  { pathId } = req.params
        const { moduleId } = req.params
        const { title , description } = req.body
        try{
            const section = new Section({
                title,
                description
            })
            const sectionRes = await section.save()
            const doc = await Path.findOne({id:pathId})
            const module = doc.modules.id(moduleId)
            module.push(section)

            doc.modules.push(module) 
            console.log(doc);
        }
        catch(err){
            console.log(err)
        }
    })
module.exports ={ pathRouter }
