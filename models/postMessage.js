import mongoose  from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    name:String,
    tags:[String],
    selectedFile: String,
    likes:{
        type:[String],
        default:[]
    },
    created:{
        type:Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('postMessage',postSchema)

export  default  PostMessage;