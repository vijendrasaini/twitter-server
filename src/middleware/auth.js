const jwt = require('jsonwebtoken')

const verifyToken = (token)=>{
    return new Promise((response, reject)=>{
        jwt.verify(token, "admin@twitterInc", function(err, result){
            if(err)
                reject("Not an valid User")
            response(result.user)
        })
    })
}

const authorization = (req, res, next)=>{
    if(!req.headers.authorization)
        return res
        .status(401)
        .send({
            status : "failed",
            reason : "authorization failure"
        })
    if(!req.headers.authorization.startsWith('Bearer'))
        return res
        .status(401)
        .send({
            status : "failed",
            reason : "authorization failure"
        })
    const token = req.headers.authorization.split(' ')[1]
    let User
    try {
        user = await verifyToken(token)
    } catch (error) {
        return res
        .status(401)
        .send({
            status : "failed",
            reason : "authorization failure"
        })
    }
    req.user = user
    next()
}

module.exports = {authorization}