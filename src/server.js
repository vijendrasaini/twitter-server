const express = require('express')
const cors = require('cors')

const mongoConnector = require('./configs/database')

// const flatController = require('./controller/flat.controller')
// const { register, login } = require('./controller/user.controller')
const userController = require('./controllers/user.controller')
const profileController = require('./controllers/profile.controller')
const followController = require('./controllers/follow.controller')
const postController = require('./controllers/post.controller')
const followingPostController = require('./controllers/followingpost.controller')

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 7000

app.use('/api/get-user',profileController)
app.use('/api/create-user/',userController)
app.use('/api/follow',followController)
app.use('/api/create-post/:username',postController)
app.use('/api/all-posts/:usernameA',followingPostController)
// app.use('/', flatController)
// app.use('/signup',register)
// app.use('/signin', login)


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