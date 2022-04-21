const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email : { type : String, required : true},
        password : { type : String, required : true},
        username : { type : String, default : Date.now().toString()+Math.random()*100000}
    },
    {
        versionKey : false
    }
)

module.exports = mongoose.model('user', userSchema)