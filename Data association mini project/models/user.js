const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/postwebsite');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type:String
    },
    posts:[
        {type: mongoose.Schema.Types.ObjectId,
         ref: "post"}
    ]
});

// Create the User model
module.exports = mongoose.model('user', userSchema);
