const mongoose =  require('mongoose')
const validator =  require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim: true,
        minlength: 1,
        unique: true, //like primary key  can't have multiple
        validate:{
            validator:validator.isEmail,
            message: `{VALUE} is not valid`
        }
    },
    password: {
        type:String,
        require: true,
        minlength:6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
})

//Tso all data is not visible in postman
//.methods.  part of mongoose
UserSchema.methods.toJSON = function(){
    console.log(this)
    var user =  this
    var userObject =  user.toObject()

    return _.pick(userObject,['_id','email'])
}



UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth'
    var token =  jwt.sign({_id: user._id.toHexString(),access},'123abc').toString()

    user.tokens.push({access,token})
    return user.save().then(()=>{
        return token
    })
}

// Model methods
UserSchema.statics.findByToken = function(token){
    var User = this //model method
    var decoded;
    try {
        decoded = jwt.verify(token,'123abc')
    }catch (e){
        return Promise.reject()
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token':token,
        'tokens.access': 'auth'
    })
}

var User = mongoose.model('User',UserSchema)

module.exports = {User}