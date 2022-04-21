const mongoose = require('mongoose')
const followSchema = new mongoose.Schema(
    {
        celeb : { type : String},
        user : { type : String},
    },
    {
        versionKey : false
    }
)

module.exports = mongoose.model('follow', followSchema)