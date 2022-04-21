const express = require('express')
const Post = require('../models/post.modal')

const router = express.Router()

router.post('/', async ( req, res)=>{
    try {
        const username = req.body.username
        const bodyReady = {
            username : username,
            postId : Date.now()*Math.random(),
            caption : req.body.caption,
            imageUrl : req.body.imageUrl,
            upvotes : 0 || req.body.upvotes
        }
        let post = await Post.create(bodyReady)
        return res
        .status(201)
        .send({
            postId : post.postId,
            caption : post.caption,
            imageUrl : post.imageUrl,
            upvotes : post.upvotes
        })
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message,
            location : "post-controller"
        })
    }
})


module.exports = router