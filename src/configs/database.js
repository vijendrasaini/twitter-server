const mongoose = require('mongoose')
const mongoDB = "mongodb://localhost:27017/twitter"
// const mongoDB = `mongodb+srv://vijendra:vijendra@cluster0.mpexw.mongodb.net/apartmentmanagement?retryWrites=true&w=majority`

module.exports = ()=>mongoose.connect(mongoDB)