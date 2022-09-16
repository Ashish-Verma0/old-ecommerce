const mongoose = require('mongoose')

mongoose.connection.once('open', () => {
    console.log('database connected')
})

mongoose.connection.on('err', () => {
    console.log('err')
})

// databaseUrl = "mongodb+srv://Ecommerce:wdc07HIzMoOUQtcn@cluster0.3hdmt.mongodb.net/Ecommerce?retryWrites=true&w=majority"

const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = connectDatabase