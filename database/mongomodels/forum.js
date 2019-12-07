var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ram-rajani:gocashless@cluster0-dnfuy.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
var ForumSchema = new mongoose.Schema({
    
    
    subject:String
    
    /*
    id:Number,
    question: [{
        qnumber:Number,
        qtext:String,
        answers:[{
            ansno:Number,
            anstext:String
        }]
    }]

    */
});


module.exports =mongoose.model("Forum",ForumSchema);

