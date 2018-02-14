const express = require('express')
const app = express();

//connect to mongo database
const url = `mongodb://localhost:27017/Fitness`
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(url)
mongoose.connection
        .once('connected', ()=>{console.log(`Connection to the server up and running`)})
        .on('err', (err)=>{
            console.log(err)
        })

//use bodyParser
const bodyParser = require('body-parser')        
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static('./public'))
//use local routes
app.use(require('./controller/routes/local_routes'))
app.listen(3000, ()=>{
    console.log(`Listeninig to port 3000`)
})