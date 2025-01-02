const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if(process.env.NODE_ENV === "development"){
    router.get("/create",async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.status(500).send("Can't create multiple owners");
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
            gstin
        });

        res.status(201).send(createdOwner);
    });
}

/*
NODE_ENV is a enviroment variable which we can define by typing in terminal 
set NODE_ENV=development for cmd prompt or 
$env:NODE_ENV="development" for powershell
*/

module.exports = router;