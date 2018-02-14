const mongoose = require('mongoose')

var connectToDatabase = ()=>{
    const url = `mongodb://localhost:27017/Fitness`
    const mongoose = require('mongoose')
    mongoose.Promise = global.Promise;
    mongoose.connect(url)
    mongoose.connection
            .once('connected', ()=>{console.log(`Connection to the server up and running`)})
            .on('err', (err)=>{
                console.log(err)
            })

}

module.exports = {connectToDatabase}
