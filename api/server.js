const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require("cloudinary")

if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config();
}

const port = process.env.PORT || 8085

connectDatabase()
const startServer = () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })

}
startServer()


