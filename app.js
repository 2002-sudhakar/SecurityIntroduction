//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const encryption = require('mongoose-encryption');
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true,useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
   email:String,
   password:String });

const secret = process.env.SECRET;
userSchema.plugin(encryption,{secret:secret,encryptedFields:["password"]});


 const User = mongoose.model('user',userSchema);

app.get("/",function(req,res){
  res.render('home');
});

app.get('/login', function(req, res) {
    res.render('login');
    });

app.post('/login',function(req,res){
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email},function(err,find){
    if(err){
      console.log(err);
    }else{
        if(find){
             if(find.password === password){
               res.render("secrets");
             }else{
               res.send("Wrong password try again...!");
             }
        }else{
          res.send("User name is not exist");
        }
    }
  });
});

    app.get('/signup', function(req, res) {

        res.render('signup');
        });

    app.post('/signup',function(req,res){
      var email = req.body.email;
       User.findOne({email:email},function(err,user){
         if(err){
           console.log(err);
         }else{
           if(user === null){
             const user = new User({
               email:email,
               password:req.body.password
             });

             user.save(function(err){
               if(err){
                 console.log(err);
               }else{
                 res.render('secrets');
               }
             });
           }else{
             res.send("User name already exist");
           }
         }

       });
    });
app.listen(27017,function(){
  console.log("Port 27017 running succussfully.");
});
