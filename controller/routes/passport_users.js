const express = require('express')
const Router = express.Router();
const {passport} = require('../../config/passportUser');
const {UserModel} = require('../../model/userModel');
const {TrainerModel} = require('../../model/trainerModel')

var checkAuthentication = (req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        res.redirect('/login')
    }
}


Router.get('/profile', checkAuthentication, (req, res)=>{

})

Router.post('/login', passport.authenticate('local-login', {failureRedirect : '/login', successRedirect : '/profile'}))

Router.post('/signup', passport.authenticate('local-signup', {failureRedirect : '/signup', successRedirect : '/picktrainer'}))


var checkTrainer = (req, res, next)=>{
    UserModel.findById(req.user.id)
             .then((user)=>{
                 if(!user.trainer){
                     next();
                 }
                 else{
                     res.redirect('/user/profile')
                 }
             })
}

Router.get('/picktrainer', checkAuthentication, checkTrainer, (req, res)=>{
    UserModel.findById(req.user.id)
             .then((user)=>{
                 TrainerModel.find({}, {name: 1, description : 1, image : 1})
                            .limit(5)
                            .sort('name')
                            .then((trainers)=>{
                                res.json(trainers);
                            })
             })
})


Router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
})

module.exports = Router;