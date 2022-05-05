const express = require('express')
const Post = require('../models/post.modal')
const { cloudinary } = require('../utils/cloudinary')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        let body = req.body
        const image = req.body.image
        if (image) {
            const uploadedResponse = await cloudinary
                .uploader
                .upload(image, {
                    upload_preset: 'twitter'
                })
            const base = `https://res.cloudinary.com/xyzabilliondollarsgoal-gmail-com/image/upload/v`
            const { version, public_id } = uploadedResponse
            body = {
                ...req.body, image: base + version + "/" + public_id
            }
        }
        const post = await Post.create(body)
        console.log(post)
        return res
            .status(201)
            .send({ success: "success" })
    } catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .send({
                message: error.message,
                location: "post-controller"
            })
    }
})

router.post('/:username/:id', async (req, res) => {
    try {
        const post = await Post
            .findById(req.params.id)
        if (post.likes.includes(req.params.username))
            post.likes = post
                .likes
                .filter(username => username != req.params.username)
        else
            post.likes
                .push(req.params.username)
        const result = await post.save()
        return res
            .status(201)
            .send({ status: "success", likes: result.likes.length })
    } catch (error) {
        return res
            .status(201)
            .status({ status: "failure" })
    }
})


router.get('/:username', async (req, res) => {
    try {
        let posts = await Post.find({})
        let result = []
        if (posts) {
            result = posts.filter(post => {
                for (let i = 0; i < post.likes.length; i++)
                    if (post.likes[i] == req.params.username)
                        return true
                return false
            })
        }
        result = result.sort((a, b) => -(new Date(a.createdAt).getTime()) + (new Date(b.createdAt).getTime()))
        console.log(result)
        return res
            .status(200)
            .send({
                likedPosts: result
            })
    } catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .status({ status: "failure" })
    }
})
module.exports = router