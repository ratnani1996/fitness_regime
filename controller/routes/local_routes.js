const express = require('express')
const Router = express.Router();
const {TrainerModel} = require('../../model/trainerModel')
const {UserModel} = require('../../model/userModel');

//homepage
Router.get('/', (req, res)=>{
    res.send('This is my front end page')
})


// Router.post('/trainer/info', (req, res)=>{
//     const trainer = new TrainerModel({
//         name : req.body.name,
//         phone : req.body.phone,
//         password : req.body.password
//     })
//     trainer.save()
//             .then((trainer)=>{
//                 res.json(trainer)
//             })
//             .catch((err)=>{
//                 res.json(err)
//             })
// })

// Router.post('/user/info', (req, res)=>{
//     const user = new UserModel({
//         name : req.body.name,
//         phone : req.body.phone,
//         password : req.body.password,
//         programOpted : req.body.program
//     })
//     user.save()
//         .then((user)=>{
//             res.json(user);
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
// })




module.exports = Router;