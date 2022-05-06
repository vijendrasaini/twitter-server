const mongoose = require('mongoose')

// const mongoDB = "mongodb://localhost:27017/twitter"
const mongoDB = "mongodb+srv://twitter:vijendra@cluster0.jsoju.mongodb.net/twitterRemote?retryWrites=true&w=majority"

module.exports = ()=>mongoose.connect(mongoDB)