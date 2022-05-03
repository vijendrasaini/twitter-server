const express = require('express')
const User = require('../models/user.model')

const router = express.Router()

router.get('/', async ( req, res)=>{
    try {
        let {search} = req.query
        let result = await User.aggregate([
            {
                $match : {
                    $or : [
                        { username : { $regex :new RegExp(search, "i") }},
                        { name : { $regex : new RegExp(search, 'i')}}
                    ]
                }
            },
            {
                $project : {
                    joined : 0,
                    email : 0,
                    password : 0
                }
            }
        ])
        if(!result)
            result = []
        return res.status(201).send(result)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})


module.exports = router