const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { strict } = require("assert");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://kunal:kunal@cluster0.emc9kdx.mongodb.net/signUpInDB");

const dataSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
});

const Data = mongoose.model("Data",dataSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var email = req.body.email;
    var pass = req.body.password;

    const data = new Data({
        firstName : fName,
        lastName : lName,
        email : email,
        password : pass
    });

    data.save();

    res.send("Successfully signed up");
})

app.get("/login",function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", function (req, res) {
    var mail = String(req.body.email);
    var pass = String(req.body.password);
  
    Data.find()
      .then(function (lls) {
        var bc = "";
        lls.forEach((ll) => {
          if (ll.email === mail) {
            bc = bc + String(ll.password);
          }
        });
  
        if (bc === pass) {
            res.sendFile(__dirname + "/successful.html");

        }
        else{
            res.sendFile(__dirname + "/unable.html");
        }
      })
      .catch((err) => {
        console.log(err);
        res.send("Error occurred while processing login");
      });
  });


app.listen(3000,function(req,res){
    console.log("server active at port 3000");
});
