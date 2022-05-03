const express = require('express')
const cors = require('cors')

const mongoConnector = require('./configs/database')

// const flatController = require('./controller/flat.controller')
// const { register, login } = require('./controller/user.controller')
// const userController = require('./controllers/user.controller')
const profileController = require('./controllers/profile.controller')
const followController = require('./controllers/follow.controller')
const createPostController = require('./controllers/createPost.controller')
const getPostsController = require('./controllers/getPosts.controller')
const followingPostController = require('./controllers/followingpost.controller')
const googleSignIncontroller = require('./controllers/googleLogin.controller')
const searchController = require('./controllers/search.controller')
const { signin, signup } = require('./controllers/account.controller')

const app = express()
app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({ limit : '50mb', extended : true}))
app.use(cors())
const port = process.env.PORT || 7000

app.use('/follow',followController)
app.use('/create-post',createPostController)
app.use('/get-posts',getPostsController )
app.use('/all-posts/:usernameA',followingPostController)
app.use('/profile',profileController)
app.use('/signup',signup)
app.use('/signin', signin)
app.use('/google',googleSignIncontroller )
app.use('/search',searchController)

module.exports = ()=>{
    app.listen(port, async ()=>{
        try {
            await mongoConnector()
            console.log(`Server is listening on the port ${port} ...`)    
        } catch (error) {
            console.log({
                message : error.message,
                status : "something bad happened"
            })
        }
    } )
}