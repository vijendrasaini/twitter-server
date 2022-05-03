const exporess = require('express')
const Post = require('../models/post.modal')
const Follow = require('../models/follow.model')

const router = exporess()

router.get('/:username', async( req, res)=>{
    try {
        let posts = await Post.find({username : req.params.username}).lean().exec()
        if(!posts)
            posts = []
        return res
        .status(200)
        .send(posts)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})

router.get('/interest/:username', async( req, res)=>{
    try {
        // console.log()
        let username = req.params.username
        const following = []
        const followingQuery = await Follow.find({ user : username}).lean().exec()
        if(Array.isArray(followingQuery)){
            for(let i = 0;i<followingQuery.length;i++){
                following.push(followingQuery[i].celeb)
            }
        }
        following.push(req.params.username)
        let posts = []
        const allPosts = await Post.find().lean().exec()
        if(allPosts){
            following.map((mentore)=>{
                let totalPostMentor = allPosts.filter(post=> post.username == mentore)
                posts = [...posts, ...totalPostMentor]
            })
            posts.sort((a,b)=>  -(new Date(a.createdAt).getTime()) + (new Date(b.createdAt).getTime()))
        }

        console.log(posts)
        return res
        .status(200)
        .send(posts)
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})
    

module.exports = router