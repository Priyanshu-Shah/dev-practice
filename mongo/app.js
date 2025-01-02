const express = require('express');
const { get } = require('mongoose');
const app = express();

const userModel = require('./usermodel');

app.get('/', function(req,res){
    res.send("We're up");
});

app.get('/create', async function(req,res){

    // userModel.create({
    //     name: "Poppie",
    //     username: "popipopipo",
    //     emial: "popi@gmail.com"
    // });
    // console.log("Creating");

    //The issue with the above snippet is that .create or infact any operation by mongose is async while log is sync, so log will be performed before by default
    //This can be combackted by async await

    let createdUser = await userModel.create({
        name: "Poppie",
        username: "popipopipo",
        email: "popi@gmail.com"
    });
    res.send(createdUser);
    //When we see the site, we will see the 3 properties displayed, along with 2 extra, _id and _v
    //In _id, first 3 bits (6 chars) are timestamp, and other are device related information
});

app.get('/update', async function(req,res){
    let updatedUser = await userModel.findOneAndUpdate({username: "popipopipo"}, {name: "popi"}, {new: true});
    res.send(updatedUser);
});

app.get('/read', async function(req,res){
    let users = await userModel.find();
    res.send(users);
});

app.get('/delete', async function(req,res){
    let deletedUser = await userModel.findOneAndDelete({name: "Poppie"});
    res.send(deletedUser);
});

app.listen(3000);