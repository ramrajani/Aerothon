const express    = require('express'),
      app        = express(),
      morgan     = require('morgan'),
      passport   = require('passport'),
      LocalStrategy =require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      bodyParser  = require('body-parser'),
      methodOverride  = require("method-override"),
      User       = require("./database/mongomodels/user.js"),
      Forum      = require("./database/mongomodels/forum"),
      Location      = require("./database/mongomodels/location"),
      Flight = require("./database/mongomodels/flight")    
      
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
app.use(express.static(__dirname + '/views'));
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

//Login routes using passport

//show sign up page
app.get("/signup",function(req,res){
    
   res.render("register",{CurrentUser:req.user, Message: 'no'});
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
                    return res.render("register", {Message: err.message});
                }
                // passport.authenticate("local")(req,res,function(){
                //       res.redirect("/" );
                // });
                res.redirect("/" );
    });
 

 });
 
 // login route
app.post("/login",passport.authenticate("local",{
    successRedirect:"/dash",
    failureRedirect:"/?loginError=true"
}),function(req,res){
    res.render("login", {LoginError: true});

});
// logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});



// -----------------------------------------------------------------------------------------------

// app.get("/",function(req,res){
//     if (!req.query.loginError)
//         res.render("login",{LoginError: false});
//     else
//         res.render("login", {LoginError: true});
// });

app.get('/', function(req, res){
    res.render('landing');
})

app.get("/dash", function(req, res){
    res.render("dash", {CurrentUser: req.user});
})

app.get("/table", function(req, res){
    res.render("tables", {CurrentUser: req.user});
})




// api's


app.get("/dashboard",isAuthenticated,function(req,res){
    res.render("dashboard",{CurrentUser:req.user});
})

app.get("/chatbot",isAuthenticated,function(req,res){
    res.render("chatbot",{CurrentUser:req.user});
})






// --------------------------CRUD-----------------------------

function isAuthenticated(req, res, next) {
    // do any checks you want to in here
  
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.isAuthenticated())
        return next();
  
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
  }



// create

app.post("/additem",isAuthenticated,function(req,res){

    //
    var itemdetail = req.body.subject;
    //var itemid = req.query.id;
    
    console.log("-------");
    // create an object of database model

        Forum.create({subject:itemdetail},function (err,result) {
        if(!err){
            console.log(result);
            res.json({err: false});
        }
        if(err){
            console.log(err);
            res.json({err: true, message: err.message});
        }
        console.log("error occured");
    });
});




// Read

app.get("/getitem",isAuthenticated,function(req,res){

    var id = req.query.id;
    Forum.find({id:id},function(err,result){
         if(!err){

            //res.send(JSON.stringify({'result':result}));
            res.json({result});
        }

    });
});


// update

app.post("/updateitem",function(req,res){

    var subject = req.body.subject;
    var updateinfo = req.body.updateinfo;
    

    Forum.updateOne({subject:subject},{$set:{subject:updateinfo}},function(err,result){

        if(!err){
            console.log("done update");
            res.send("success");
        }
});

});


// Delete

app.post("/deleteitem",function(req,res){

     var subject=req.body.subject;
     Forum.findOneAndDelete({subject: subject},function(err,result){
         if(!err){
             console.log(result);
             res.send("sucess");
         }
     })

})   

// app.post("/addFlight",function(req,res){

//     //
//     var itemdetail = req.body.subject;
     
//     var flightNum=req.body.num,
//     var company =req.body.company,
//     var origin=req.body.origin,
//     var originDate=req.body.origin,
//     var originTime=req.body.origin,
//     var  desDate=req.body.origin,
//     var desTime=req.body.origin,
//     var destination=req.body.origin,
    
//     var roulen=route.length;
//     var route=[];
//     for(i in route){
//         var newstop= {};
//         newstop.inbetrounam=i.inbetrounam;
//         newstop.stopTime=i.stoptime;
//         newstop.stopDate=i.stopDate;
//         newstop.stopnum=i.stopnum;
//         route.push(newstop);
//     }
  




//     //var itemid = req.query.id;
    
//     console.log("-------");
//     // create an object of database model

//         Forum.create({subject:itemdetail},function (err,result) {
//         if(!err){
//             console.log(result);
//             res.json({err: false});
//         }
//         if(err){
//             console.log(err);
//             res.json({err: true, message: err.message});
//         }
//         console.log("error occured");
//     });
// });




app.get("/getlocation",function(req,res){

    Location.find({},function(err,result){
        if(!err)
        res.send({result:result});
    })
})

app.get("/findFlight",function(req,res){

    var destination=req.body.des;
    var out=[]
    //console.log(req.query);
    Flight.find({origin:"Srinagar"},function(err,result){

        console.log(result);         
        result.forEach(element => {
            if(element.destination==req.query.des){
                out.push(element);
             }else{
                 Flight.find({origin:element.destination,destination:req.query.destination},function(err,result){
                     result.forEach(ele =>{
                         out.push(ele);
                     });
                 })
             }
        })
            
        
          

    });
     
     res.json({result:out});

});


app.listen(3000,function(req,res){
    console.log("server started");
});