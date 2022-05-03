const express = require('express')
const Post = require('../models/post.modal')
const Follow = require('../models/follow.model')
const User = require('../models/user.model')

const router = express.Router()

router.get('/', async(req,res)=>{
    try {
        const userQuery = await User.findOne({username : req.params.usernameA})
        if(!userQuery)
            return res
            .status(400)
            .send({
                status: "failure",
                reason: "user doesn't exits"
            })
        const followings = await Follow.find({ user : req.params.usernameA}).lean().exec()
        const celebs = []
        followings?.map(obj=>{
            celebs.push(obj.celeb)
        })

        let ans = []
        for(let i = 0;i<celebs.length;i++)
        {
            let username = celebs[i]
            const post = await Post.find(username).lean().exec()
            ans = [...ans, ...post]
        }
        let finalAns = []
        ans.map(post=>{
            const {postId, imageUrl, caption,upvotes} = post
            finalAns.push({
                postId,
                imageUrl,
                caption,
                upvotes,
            })
        })
        return res.status(200).send(finalAns)
    } catch (error) {
        return res.status(500).send({
            message : error.message
        })
    }
})


module.exports = router