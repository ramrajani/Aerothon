var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ram-rajani:gocashless@cluster0-dnfuy.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });

var passportLocalMongoose = require('passport-local-mongoose');
var FlightSchema = new mongoose.Schema({
    flightNum:String,
    company :String,
    origin:String,
    originDate:String,
    originTime:String,
    desDate:String,
    desTime:String,
    destination:String
    
    
});


module.exports =mongoose.model("Flight",FlightSchema);

