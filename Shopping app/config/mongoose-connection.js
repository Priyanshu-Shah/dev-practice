const mongoose = require('mongoose');
const config = require("config");
const dbgr = require("debug")("development:mongoose");

/*
We have set development as an env variable, to ab ham jab bhi development phase me honge tab 
mogoose.connect waali line will fetch url from development.json file, production phase me we 
can make a env variable named production and make a production.json file 
*/

mongoose
.connect(`${config.get("MONGODB_URI")}/product`)
.then(function(){
    dbgr("connected"); //console log is not a good approach whne using a proper server (kyuki unke system me log hoga vo)
})
.catch(function(err){
    dbgr(err);
})

/*
dbgr ka kaam hai ki we can only access the logs upon setting up enviroment
kaise, by writing in terminal export DEBUG=development=*
now this command might change based on terminal, above one was for bash
for powershell use $env:DEBUG="development:*"
matlab export karo env variable, DEBUG naam se and usme development phase me * yaani saare logs batado
*/

module.exports = mongoose.connection;