const express    = require('express'),
      app        = express(),
      morgan     = require('morgan'),
      passport   = require('passport'),
      LocalStrategy =require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      bodyParser  = require('body-parser'),
      methodOverride  = require("method-override"),
      User       = require("./database/mongomodels/user.js"),
      Forum      = require("./database/mongomodels/forum");



      
      
      
      
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
app.use(require('express-session')({
    secret:"RSquare Corporation will be there soon",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(__dirname + '/styles'));
app.use(morgan('combined'));



//  isloggedIn function -- checking for user logged in using session



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//-----------------------------------------------------------------------------------------------
//login routes

//   Login routes using passport

//show sign up page
app.get("/signup",function(req,res){
    
   res.render("register",{CurrentUser:req.user});
});




// register route 
app.post("/register",function(req,res){

console.log(req.body);

    User.register(new User({ 
    fullname:req.body.name,
    username:req.body.id,  //email
       }),req.body.password,function(err,user){
                if(err){
                    console.log(err);
                    return res.render("index");
                }
                passport.authenticate("local")(req,res,function(){
                      res.redirect("/");
                });
    });
 

 });
 
 // login route
app.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/india"
}),function(req,res){


});
// logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});



// -----------------------------------------------------------------------------------------------

app.get("/",function(req,res){
   res.render("index",{CurrentUser:req.user}); 
});





// api's


app.get("/dashboard",function(req,res){
    res.render("dashboard",{CurrentUser:req.user});
})

app.get("/chatbot",function(req,res){
    res.render("chatbot",{CurrentUser:req.user});
})






// --------------------------CRUD-----------------------------



// create

app.get("/additem",function(req,res){

       //
       var itemdetail = req.query.subject;
       var itemid = req.query.id;
       
       console.log("-------");
       // create an object of database model

          Forum.create({subject:itemdetail,id:itemid},function (err,result) {
            if(!err){
                console.log(result);
                res.send("success save ");


            }
            if(err){
                console.log(err);
            }
            console.log("error occured");
});
      





});




// Read

app.get("/getitem",function(req,res){

    var id = req.query.id;
    Forum.find({id:id},function(err,result){
         if(!err){

            res.send(JSON.stringify({'result':result}));
         }

    });
});


// update

app.get("/updateitem",function(req,res){

    var id = req.query.id;
    var updateinfo = req.query.updateinfo;
    

    Forum.updateOne({id:id},{$set:{subject:updateinfo}},function(err,result){

        if(!err){
            console.log("done update");
            res.send("success");
        }
});

});


// Delete

app.get("/deleteitem",function(req,res){

     var id=req.query.id;
     Forum.findOneAndDelete({id:id},function(err,result){
         if(!err){
             console.log(result);
             res.send("sucess");
         }
     })

})
      


      

app.listen(3000,function(req,res){
    console.log("server started");
});

