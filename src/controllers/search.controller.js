const express = require('express')
const User = require('../models/user.model')
const Follow = require('../models/follow.model')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let { search } = req.query
        let result = await User.aggregate([
            {
                $match: {
                    $or: [
                        { username: { $regex: new RegExp(search, "i") } },
                        { name: { $regex: new RegExp(search, 'i') } }
                    ]
                }
            },
            {
                $project: {
                    joined: 0,
                    email: 0,
                    password: 0
                }
            }
        ])
        if (!result)
            result = []
        return res.status(201).send(result)
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message
            })
    }
})


router.get('/best-connections/:username', async (req, res) => {
    try {
        const username = req.params.username
        const followings = await Follow
            .aggregate([
                {
                    $lookup: {
                        from: "users",
                        foreignField: "username",
                        localField: 'celeb',
                        as: 'nameAndAvatar'
                    }
                },
                {
                    $project: {
                        celeb: 1,
                        user: 1,
                        "nameAndAvatar.avatar": 1,
                        "nameAndAvatar.name": 1
                    }
                }
            ])
            
        // console.log({followings})
        const level1f = followings.filter(user => user.user == username)
        const level2f = []
        level1f.forEach(user => followings.forEach(user1 => {
            if (user1.user == user.celeb)
            level2f.push(user1)
        }))
        // console.log(level2f)
        level2f.sort((a, b) => (a.username - b.username))
        for (let i = 1; i < level2f.length; i++)
        if (level2f[i].username === level2f[i] - 1)
        level2f[i - 1] = ""
        
        for (let i = 0; i < level2f.length; i++) {
            if (level2f[i] == "")
                continue
            else {
                let c = 0
                followings.forEach(user => user.celeb == level2f[i].username ? c++ : c = c)
                level2f[i].followersCount = c
            }
        }
        let userRecommended = level2f.filter(user => user != "")
        userRecommended.sort((a, b) => b.followersCount - a.followersCount)
        let loopCount = userRecommended.length >= 5 ? 5 : userRecommended.length
        let expectedArr = []
        for (let i = 0; i < loopCount; i++)
            expectedArr[i] = userRecommended[i]
        return res
            .status(201)
            .send(expectedArr)
    } catch (error) {
        return res
            .status(500)
            .send({
                message: error.message
            })
    }
})


module.exports = router