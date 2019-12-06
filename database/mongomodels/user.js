var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/airbus',{ useNewUrlParser: true });
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
    password:String,
    fullname:String,
    username:String,  //email
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("User",UserSchema);

