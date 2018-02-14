//this file contains the passport authenticatin for trainers

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {TrainerModel} = require('../model/trainerModel');


passport.serializeUser((trainer, done)=>{
    done(null, trainer.id);
})

passport.deserializeUser((id, done)=>{
    TrainerModel.findById(id)
        .then((trainer)=>{
            done(null, trainer)
        })    
        .catch((err)=>{
            done(err);
        })
})

passport.use('local-signup', new LocalStrategy({
    usernameField : 'phone',
    passwordField : 'password',
    passReqToCallback : true,
    session : false
}, (req, phone, pass, done)=>{
    TrainerModel.findOne({phone : phone})
        .then((trainer)=>{
            if(trainer){
                return done(null, false, req.flash('message', 'User already exists') );
            }
            else{
                var newTrainer = new TrainerModel({
                    phone : phone,
                    password : pass
                })
                TrainerModel.save()
                       .then((trainer)=>{
                           console.log(`Trainer ${trainer.name} saved to database`);
                           done(null, trainer);
                       })
            }
        })
        .catch((err)=>{
            console.log(err);
            done(err, null, req.flash('message' , 'It happened to have some error'));
        })
}))

module.exports = {passport}