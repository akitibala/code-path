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
            res.send(pathRes).status(201)
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
        await doc.save()
        console.log(moduleRes);
        res.send(doc).status(201)
    }
    catch(err){
        console.log(err)
    }

    })


pathRouter.route('/:pathId/modules/:moduleId/sections')
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
            // const module = doc.modules.id(moduleId)
            // console.log(module)
            // module.push(section)
            const index =doc.modules.findIndex( module => module.id === moduleId)
            console.log(index)
            doc.modules[index].sections.push(section) 
            await  doc.save()
            console.log(doc);
            res.send(doc).status(201)

        }
        catch(err){
            console.log(err)
        }
    })
module.exports ={ pathRouter }
