//First in out folder we write npm init -y in terminal to make package.json ile
//next the package ile is defaulted to work on index.js so we made the index.js file
//Then we do npm i express to make the package-lock file

const express = require('express'); //We import express
const path = require('path');
const app = express(); //We store express in variable app
const fs = require('fs');
const { log } = require('console');

app.set("view engine", "ejs"); //We set our view engine as ejs (ejs is html with features like dynamic script/calcs)
app.use(express.json()); //use means we are setting a middleware
app.use(express.urlencoded({extended: true})); //Line 10 and 11 are parsers
app.use(express.static(path.join(__dirname, "public"))); //This just says ki public name ke folder me sab static files store hongi
//Public wale folder me store hoga hamara frontend vanilla, images, css , vagera vagera


app.get('/', function(req,res){ //This is our default route
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files}); //Callback ke andar res means files read hone ke baad hi page render hoga
        //upar wali line se ham index.ejs wali file me files bhej rhe hai files ke naam se, jisko vo padhega 
    })
    //res.send jab frontend pe bhejna ho
    //console.log jab console me bhejna ho
    //res.render jab frontend pe koi aur file use karni ho
});

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render("show", {filename: req.params.filename, filedata: filedata});
    });
});

app.get('/edit/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render('edit', {filename: req.params.filename, filedata: filedata});
    });
});

app.post('/create', function(req,res){ //Jab bhi form submit hoga, hamara data iss route pe ayega
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, function(error){
        res.redirect('/'); //This redirects us to / path after making the task
    });
    //this line will write a file in iles folder with name in format of title, example title be "My First Problem", then we will get MyFirstProblem.txt file added
});

app.post('/edit1', function(req,res){
    fs.rename(`./files/${req.body.prevname}`, `./files/${req.body.newname}`, function(err){
        res.redirect('/');
    });
}); //This post is to edit fiename, so it takes prevname(defaulted to filename) and newname from input and uses fs.rename

app.post('/edit2', function(req,res){
    fs.writeFile(`./files/${req.body.prevname}`, req.body.newdesc, function(err){
        res.redirect('/');
    });
}); //This post is to change the description so it makes a hidden input for filename, reads that filename, takes newdesc input, and writes the new input in that file

app.listen(3000);