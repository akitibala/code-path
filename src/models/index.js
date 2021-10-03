const mongoose = require('mongoose');
// const userSchema = require('./user')
// const moduleSchema  =  require('./module')
// const sectionSchema = require('./section')
// const pathSchema = require('./path')


// mongoConn =connection().catch(err => console.log(err));

// async function connection() {
const mongoConn =   mongoose.createConnection('mongodb://localhost:27017/test');
//  return conn

// }

const sectionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    
    },
    isSectionCompleted:{
        type:Boolean,
        default:false
        
    }
    })

const moduleSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
},
description:{
    type:String,
},
        sections:[sectionSchema],
        isModuleCompleted:{
            type:Boolean,
            default:false
        }
        })
        

const pathSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    
    },
    tags:{
        type:Array,
    }  ,
    // modules:{
    //     type:[Module]
    // } ,
    modules:[moduleSchema]

})

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true })



User = mongoConn.model('User', userSchema)

Path = mongoConn.model('Path',pathSchema)
Module = mongoConn.model('Module',moduleSchema)
Section = mongoConn.model('Section',sectionSchema)

module.exports = {
User,
Path,
Section,
Module
}
