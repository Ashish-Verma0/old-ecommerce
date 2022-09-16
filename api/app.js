const express = require('express')
const productRouter = require('./routes/product.router')
const userRouter = require('./routes/user.router')
const errorMiddleware = require('./middlewares/error')
const cookieParser = require('cookie-parser')
const orderRouter = require('./routes/order.router')
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const userDatabase = require("./model/user.model")
const path=require("path")
// google authentication process start
const passport = require("passport")
const Strategy = require("passport-google-oauth20")
const session = require('express-session')
const sendToken = require('./utils/jwtToken')
const paymentRouter = require('./routes/payment.router')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

var userProfile;

app.get('/success', async (req, res) => {
    // res.send(userProfile)
    try {
        const user = await userDatabase.findOne({ email: userProfile.emails[0].value })
        console.log(userProfile.emails[0].value)
        if (!user) {
            return res.status(404).json({
                message: "falied to accesss user"
            })
        }
        if (user) {
            return sendToken(user, 200, res)
        }
        return res.redirect("http://localhost:3001/")
    } catch (error) {
        console.log(error)
    }

});
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
    clientID: '455316609449-7rth3ln130kciffon1ugjs5s0s279dlh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8084/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);

    }
));
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/success');
    });


// google authentication process end

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// routes
app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)
app.use('/api/v1',paymentRouter)

// uploading heroku process start
app.use(express.static(path.join(__dirname,"../ui/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../ui/build/index.html"))
})
// uploading heroku process end

app.get('/', (req, res) => {
    res.send("hello world")
})
// middleware errorHandler
app.use(errorMiddleware)
module.exports = app