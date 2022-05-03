const { hashSync, compareSync } = require('bcryptjs')
const uuid = require('uuid')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name : { type : String, required : true},
        email : { type : String, required : true},
        password : { type : String, required : true},
        username : { type : String, default : uuid.v4()},
        joined : { type : String, required : false},
        avatar : { type : String, required : false}
    },
    {
        versionKey : false
    }
)


userSchema.pre('save', function(next){
    if(!this.isModified('password')) 
        next()
    this.password = hashSync(this.password)
    next()
})

userSchema.methods.checkPassword = function(password){
    return compareSync(password, this.password)
}

module.exports = mongoose.model('user', userSchema)