const express = require('express')
const User = require('../models/user.model')
const Follow = require('../models/follow.model')
const router = express.Router()

router.post('/:usernameA/:usernameB', async ( req, res)=>{
    try {
            let ua = req.params.usernameA
            let ub = req.params.usernameB
            const userBQuery = await User.findOne({username : ub})
            if(!userBQuery)
                return res
                .status(400)
                .send({
                    status:"failure",
                    reason:"explanation"
                })
            const status = await Follow.create({
                celeb : ub,
                user : ua
            })
            
        // if(user)
        //     return res
        //     .status(400)
        //     .send(
        //         {
        //         status : "failure",   
        //         reason : "User a or b not exits"
        //         }
        //     )
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