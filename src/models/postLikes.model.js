const mongoose = require('mongoose')
const postLikesSchema = new mongoose.Schema(
    {
            username : { type : String , required : true}
    },
    {
        versionKey : false
    }
)

module.exports = mongoose.model('post', postLikesSchema)