//this file contains the passport authenticatin for users

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {UserModel} = require('../model/userModel');


passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    UserModel.findById(id)
        .then((user)=>{
            done(null, user)
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
    UserModel.findOne({phone : phone})
        .then((user)=>{
            if(user){
                return done(null, false, req.flash('message', 'User already exists') );
            }
            else{
                var newUser = new UserModel({
                    phone : phone,
                    password : pass
                })
                UserModel.save()
                       .then((user)=>{
                           console.log(`User ${user.name} saved to database`);
                           done(null, user);
                       })
            }
        })
        .catch((err)=>{
            console.log(err);
            done(err, null, req.flash('message' , 'It happened to have some error'));
        })
}))

module.exports = {passport}