const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');

router.get("/", function(req,res){
    res.send("working");
});

router.post("/register",function(req,res){
    try{
        let {email, password, fullname} = req.body;
        
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });

                    let token = jwt.sign({email, id:user_id}, "choppie");
                    res.cooie("token", token);
                    
                }
            })
        })
        //to ensure all fields are properly recieved, we can make protected route
        //and make a function which does the necessary checks
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;