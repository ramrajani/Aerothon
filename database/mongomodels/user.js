var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ram-rajani:gocashless@cluster0-dnfuy.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });

var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
    password:String,
    fullname:String,
    username:String,  //email
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("User",UserSchema);

