const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
    {
            caption : { type : String},
            imageUrl : { type : String}
    },
    {
        versionKey : false
    }
)

module.exports = mongoose.model('post', postSchema)