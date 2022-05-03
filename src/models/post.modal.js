const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
    {
            username : { type : String , required : true},
            name : { type : String , required : true},
            title : { type : String },
            image : { type : String },
            likes : {type : Number, required : false,default : 0}
    },
    {
        versionKey : false,
        timestamps : true
    }
)

module.exports = mongoose.model('post', postSchema)