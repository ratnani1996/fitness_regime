const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const TrainerSchema = mongoose.Schema({
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
    trainees : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    description : {
        type : String
    },
    image : {
        type : String
    }
})

//before saving the password hash it
TrainerSchema.pre('save', function(next){
    var trainer = this;
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
                trainer.password = hash;
                return next();
            });
        });
    }
    
})

//mehtods for comparing passwords
TrainerSchema.methods.comparePassword = function comparePassword(password){
    var trainer = this;
    return bcrypt.compareSync(password, trainer.password);
}


const TrainerModel = mongoose.model('trainers', TrainerSchema);

module.exports = {TrainerModel};