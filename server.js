const express = require('express')
const app = express();
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash  = require('connect-flash')

//connect to mongo database
const mongoURL = `mongodb://localhost:27017/Fitness`
const {connectToDatabase} = require('./config/Connection')
connectToDatabase();
const MongoStore = require('connect-mongo')(session)

app.use(flash())
app.use(morgan('dev'))
app.use(cookieParser());
app.use(session({
    secret : `something_something`,
    saveUninitialized : true,
    resave : true,
    cookie : {
        //secure : true
        maxAge :10*60*1000
    },
    store : new MongoStore({
        url : mongoURL
    })
}))


//use bodyParser
const bodyParser = require('body-parser')        
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static('./public'))
//use local routes
app.use(require('./controller/routes/local_routes'))
//trainer passport routes
app.use('/trainer', require('./controller/routes/passport_trainer'));
//user passport routes
app.use('/user', require('./controller/routes/passport_users'));

//if the user goes to another path
app.use((req, res)=>{
    res.status(404).send('Trying to be smart BRUH!!!!')
})

var PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Listeninig to port ${PORT}`)
})