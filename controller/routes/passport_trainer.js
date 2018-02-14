const express = require('express')
const Router = express.Router();
const {passport} = require('../../config/passportTrainer');
const {TrainerModel} = require('../../model/trainerModel')
var checkAuthentication = (req, res, next)=>{
    if(req.trainer){
        next();
    }
    else{
        res.redirect('/login')
    }
}


Router.get('/profile', checkAuthentication, (req, res)=>{
    TrainerModel.findById(req.user.id, {trainees : 1})
                .populate('trainees')
                .then((trainer)=>{
                    res.json(trainer);
                })
})

Router.post('/login', passport.authenticate('local-login', {failureRedirect : '/login', successRedirect : '/profile'}))

Router.post('/signup', passport.authenticate('local-signup', {failureRedirect : '/signup', successRedirect : '/profile'}))

Router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
})

module.exports = Router;