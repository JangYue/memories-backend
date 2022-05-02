import express from "express"

import {getPosts,createPost,updatePost,deletePost,likePost} from "../controllers/posts.js"

const router = express.Router();

router.get("/",getPosts);
router.post("/",createPost);
// patch 更新
router.patch("/:id",updatePost);
router.delete("/:id",deletePost);
router.patch("/:id/likePost",likePost)

export default router;