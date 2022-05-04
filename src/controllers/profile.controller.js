const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Post = require('../models/post.modal')
const Follow = require('../models/follow.model')
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

router.get('/:username/:usernameB', async (req, res) => {
    try {
        const usernameB = req.params.usernameB
        const username = req.params.username
        const followers = []
        const following = []
        const posts = []


        const findUser = await User
            .findOne({ username: usernameB })
            .lean()
            .exec()
        if (!findUser)
            return res
                .status(404)
                .send({})


        const { name, joined, avatar } = await User
            .findOne({ username: usernameB })
            .lean()
            .exec()
        const MMDDYYYY = joined.split('/')
        const MMYYYY = [monthArr[MMDDYYYY[0] - 1], MMDDYYYY[2]].join(" ")


        const followersQuery = await Follow
            .find({ celeb: usernameB })
            .lean()
            .exec()
        followersQuery?.map(obj => {
            followers.push(obj.user)
        })


        const isFollwing = await Follow
            .findOne({ $and: [{ celeb: usernameB }, { user: username }] })
            .lean()
            .exec()
        const status = isFollwing == null || (Array.isArray(isFollwing) && isFollwing.length == 0) ? 0 : 1


        const followingQuery = await Follow
            .find({ user: usernameB })
            .lean()
            .exec()
        if (Array.isArray(followingQuery))
            for (let i = 0; i < followingQuery.length; i++)
                following.push(followingQuery[i].celeb)
        else
            following.push(followersQuery.celeb)


        const postsQuery = await Post
            .find({ username: usernameB })
            .lean()
            .exec()
        postsQuery?.sort((a,b)=>  -(new Date(a.createdAt).getTime()) + (new Date(b.createdAt).getTime()))?.map(post => {
            posts.push(post)
        })


        return res
            .status(200)
            .send({
                name,
                username: usernameB,
                avatar,
                joined: MMYYYY,
                followers: followers.length,
                following: following.length,
                posts : posts,
                status
            })
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message,
            })
    }
})

module.exports = router