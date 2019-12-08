var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ram-rajani:gocashless@cluster0-dnfuy.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
var LocationSchema = new mongoose.Schema({
    
    locations:[String]
});


module.exports =mongoose.model("Location",ForumSchema);

