//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.get("/",function(req,res){
  res.render('home');
});

app.post("/",function(req,res){
  res.send("yourform is submitted");
});

app.get('/login', function(req, res) {
    res.render('login');
    });

app.post('/login',function(req,res){
  res.send("succussfully logged");
});

    app.get('/signup', function(req, res) {
        res.render('signup');
        });

app.listen(3000,function(){
  console.log("Port 3000 running succussfully.");
});
