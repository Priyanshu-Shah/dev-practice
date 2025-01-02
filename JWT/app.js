const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const userModel = require('./modules/user');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', function(req, res){
    res.render("index");
});

app.post('/create', function(req,res){
    let {username, email, password, age} = req.body;
    bcrypt.genSalt(10, (err,salt)=>{ //We use this to hash the password, so in our DB, the password is set as a hash
        bcrypt.hash(password, salt, async (err,hash)=>{
            let createdUser = await userModel.create({
                username,
                email,
                password : hash,
                age
            })

            let token = jwt.sign({email}, "secret_message"); //We setup a token so that depending on email, user ko baar baar login na karta rehna pade
            res.cookie("token", token);
            res.send(createdUser);
        })
    })
});

app.get("/logout", function(req,res){ //demonstration purpose ke liye filhaal get method use kiya hai
    res.cookie("token", ""); //pehle token kiya tha vo hatt jayega
});

app.get("/login", function(req, res){
    res.render('login');
});

app.post("/login", function(req, res){
    let user = userModel.findOne({email:req.body.email});
    if(!user) return res.send("Something Went Wrong");
    //user.password me hoga hashed password, req.body.password me hoga vo jo user abhi enter karega login karne ke liye, to ham karenge compare, to verify
    bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({email}, "secret_message");
            res.cookie("token", token);
            //To ab login karne pe token bann gaya
            res.send("You can login");
        }
        else res.send("Something Went Wrong");
    })
});


app.listen(3000);