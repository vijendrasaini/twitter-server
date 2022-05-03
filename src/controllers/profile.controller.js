const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Post = require('../models/post.modal')
const Follow = require('../models/follow.model')
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

router.get('/:username', async(req, res)=>{
    try {
        const username = req.params.username
        const findUser = await User.findOne({ username}).lean().exec()
        if(!findUser)   
            return res
            .status(404)
            .send({})

        const followers = []
        const following = []
        const posts = []

        const { name, joined, avatar} = await User.findOne({ username : username}).lean().exec()
        const MMDDYYYY = joined.split('/')
        const MMYYYY = [monthArr[MMDDYYYY[0]-1],MMDDYYYY[2]].join(" ")
        const followersQuery = await Follow.find({ celeb : username}).lean().exec()
        followersQuery?.map(obj =>{
            followers.push(obj.user)
        })
        
        const followingQuery = await Follow.find({ user : username}).lean().exec()
        if(Array.isArray(followingQuery)){
            for(let i = 0;i<followingQuery.length;i++){
                following.push(followingQuery[i].celeb)
            }
        }
        else {
            following.push(followersQuery.celeb)
        }
        const postsQuery = await Post.find({ username}).lean().exec()
        postsQuery?.map(post=>{
            const { title, image} = post
            posts.push({title, image})
        })
        return res
        .status(200)
        .send({name,username,avatar,joined : MMYYYY,followers : followers.length,following: following.length ,posts})
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message,
        })
    }
})

module.exports = router