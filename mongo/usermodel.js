const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/practice');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
}); //Schema stores all data jo hame store karna hai

module.exports = mongoose.model("user", userSchema); //Jo naam likhenge uska plural hoke model banega, jaise yaha users
//Ye model ko hamne export kardiya and app.js wali file me require kar denge