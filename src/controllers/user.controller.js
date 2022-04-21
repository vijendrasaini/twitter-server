const express = require('express')
const User = require('../models/user.model')

const router = express.Router()

router.post('/', async ( req, res)=>{
    try {
        const username = req.body.username
        let user = await User.findOne({username}).lean().exec()
        if(user)
            return res
            .status(400)
            .send(
                {
                status : "failure",   
                reason : "User already exits"
                }
            )
        user = await User.create(req.body)
        return res
        .status(201)
        .send({ status : 'success',username : user.username})
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})


module.exports = router