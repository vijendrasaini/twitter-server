const express = require('express')
const {OAuth2Client} = require('google-auth-library');
const { newToken } = require('./account.controller');
const { v4 } = require('uuid')

const User = require('../models/user.model');
const router = express.Router()

const CLIENT_ID = `257505824421-o9l99qvh3d4nj20nm86k19vatjn9kbdh.apps.googleusercontent.com`
const client = new OAuth2Client(CLIENT_ID);


async function verify(token) {
    
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const profile = {
      email : payload.email,
      picture : payload.picture,
      name : payload.name
  }
  return profile
}


function getTodayDate(){
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
}
router.post('/signin', async(req, res)=>{
    try {
        const token = req.body.tokenId
        let profile
        try {
            profile = await verify(token)
        } catch (error) {
            console.log({message : error.message})
            return res
            .send({
                status : "failure"
            })
        }
        let userFound = await User.findOne({ email : profile.email}).lean().exec()

        let user = {
            name : profile.name,
            email : profile.email,
            username : profile.email.split('@')[0],
            joined : getTodayDate(),
            avatar : profile.picture,
            password : v4(),
        }
        if(userFound)
        {
            return res
            .status(200)
            .send({
                status : 'success',
                userExist : true,
                username : profile.email.split('@')[0],
                name : profile.name,
                avatar : profile.picture,
                token : newToken(user),
            })
        }
        if(!req.body.day)
            return res.send({
                status : "success",
                userExist : false
            })
        else
        user = await User.create(user)

        return res
        .status(200)
        .send({
            status : 'success',
            token : newToken(user),
            username : profile.email.split('@')[0],
            avatar : profile.picture,
            name : profile.name
        })
    } catch (error) {
        return res
        .status(500)
        .send({
            status : "failure"
        })
    }
})


module.exports = router


