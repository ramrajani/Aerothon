var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/airbus',{ useNewUrlParser: true });
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

