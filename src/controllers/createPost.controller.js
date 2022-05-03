const express = require('express')
const Post = require('../models/post.modal')
const { cloudinary } = require('../utils/cloudinary')
const router = express.Router()

router.post('/', async ( req, res)=>{
    try {
        let body = req.body
        const image = req.body.image 
        if(image){
            const uploadedResponse = await cloudinary
            .uploader
            .upload(image, {
                upload_preset : 'twitter'
            })
            const base = `https://res.cloudinary.com/xyzabilliondollarsgoal-gmail-com/image/upload/v`
            const { version,public_id } = uploadedResponse
            body = {
                ...req.body, image : base+version+"/"+public_id
            }
        }
        const post = await Post.create(body)
        return res
        .status(201)
        .send({ success : "success"})
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .send({
            message : error.message,
            location : "post-controller"
        })
    }
})


module.exports = router