// 这里存放的是和posts路由相关的处理逻辑

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res) => {
    try{
        const postMessage = await PostMessage.find();
        
        res.status(200).json(postMessage)
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    try{
     
        const newPost = new PostMessage(post);
      
        await newPost.save();
        res.status(201).json(newPost)
       
    }catch(error){
       
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async(req,res) => {
    
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const  updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost)
}

export const deletePost = async (req,res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.json({message:'Post deleted successful!'})

}

export const likePost = async (req,res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(_id);

    const updatePost = await PostMessage.findByIdAndUpdate(_id,{likeCount:post.likeCount+1},{new:true});

    res.json(updatePost)
}