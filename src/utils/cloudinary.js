const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : "xyzabilliondollarsgoal-gmail-com",
    api_key : "645186216733517",
    api_secret : "np1pGTX-ru33-xMd8f22v8VUXGg"
})

module.exports = {cloudinary}