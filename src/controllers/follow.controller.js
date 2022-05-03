const express = require('express')
const User = require('../models/user.model')
const Follow = require('../models/follow.model')
const router = express.Router()

router.post('/:username/:usernameB', async ( req, res)=>{
    try {
        console.log({ u : req.params.username, ub  : req.params.usernameB})
            const status = await Follow.create({
                celeb : req.params.usernameB,
                user : req.params.username
            })
        return res
        .status(202)
        .send({  status: "success" })
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})


module.exports = router

//  