const express = require('express');
const app = express();
const UserModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get('/', function(req,res){
    res.render("index");
});

app.get('/login', function(req,res){
    res.render("login");
});

app.get('/profile', isLoggedIn, async function(req,res){
    let user = await UserModel.findOne({email: req.user.email}).populate("posts"); //id ko populate karna
    res.render("profile", {user}); //hamne isLoggedIn me req.user me jwt ka data daala hai matlab email and password
});

app.get('/like/:id', isLoggedIn, async function(req,res){
    let post = await postModel.findOne({_id: req.params.id}).populate("user"); //id ko populate karna

    if(post.likes.indexOf(req.user.userid)===-1){ //agar already liked nahi hai
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1); //Post ke likes me se ye index wala banda 1 baar hatao
    }

    await post.save();
    res.redirect("/profile"); //hamne isLoggedIn me req.user me jwt ka data daala hai matlab email and password
});

app.post('/edit', async function(req, res) {
    const { postId, content } = req.body;

    if (postId) {
        // Update existing post
        await postModel.findByIdAndUpdate(postId, { content });
    } else {
        // Create new post
        await postModel.create({ content, user: req.user._id });
    }

    res.redirect('/profile');
});

app.post('/register', async function (req, res) {
    let {name, username, email, age, password} = req.body;
    let user = await UserModel.findOne({email});
    if(user) return res.status(500).send("User Already Registered"); //Check if user already exists

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err,hash){
            let user = await UserModel.create({
                name,
                username,
                email,
                age,
                password: hash //DB me password ko hashed form me store karenge
            });

            let token = jwt.sign({email, userid: user._id}, "secret"); //To ham cookie me store karenge email and user_id from schema
            res.cookie("token", token);
            res.redirect('/login');
        });
    })
});

app.post('/post', isLoggedIn, async function(req, res){
    let user = await UserModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user: user._id,
        content: req.body.content,

    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/login', async function(req, res){
    let {email, password} = req.body;
    let user = await UserModel.findOne({email});
    if(!user) return res.status(500).send("Something Went Wrong"); //Check if user already exists

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({email, userid: user._id}, "secret");
            res.cookie("token", token);
            res.status(200).redirect('/profile')
        }
        else res.redirect('/login');
    })
});

app.post('/logout', (req,res)=>{
    res.redirect('/logout');
});

app.get('/logout', (req,res)=>{
    res.cookie("token", "");
    res.render("login");
});

function isLoggedIn(req,res,next){
    if(req.cookies.token === "") res.redirect('/login'); //This makes protected route matlab agar kisi route me zaruri hai ki user logged in ho
    // then this function acts as a middleware and checks the condition
    else{
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    }
}

app.listen(3000);