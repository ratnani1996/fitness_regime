const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcryptjs')
const ExcercisesSchema = mongoose.Schema({
    dayName : {
        type : String
    },
    exercise : {
        type : Array
    }
    
})

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true,
        unique : true,
        validate : {
            validator : function(v){
                return validator.isInt(v);
            },
            message : '{VALUE} is not a valid phone number!'
        }
    },
    password : {
        type : String,
        require : true,
        min : 6
    },
    programOpted : {
        type : String
    },
    excercises : [ExcercisesSchema],
    height : {
        type : Number,
        require : true
    },
    weight : {
        type : Number,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})


//before saving the password hash it
UserSchema.pre('save', function(next){
    var user = this;
    if(!this.isModified('password')){
        return next();
    }
    else{
        //generate the salt
        bcrypt.genSalt(10, (err, salt)=> {
            if(err){
                return next(err);
            }
            bcrypt.hash(this.password, salt, function(err, hash) {
                user.password = hash;
                return next();
            });
        });
    }
    
})

//mehtods for comparing passwords
UserSchema.methods.comparePassword = function comparePassword(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
}



const UserModel = mongoose.model('users', UserSchema);

module.exports = {UserModel}