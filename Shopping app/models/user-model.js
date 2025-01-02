const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart:{
        type: Array,
        default: []
    },
    orders:{
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});

// Create the User model
const user = mongoose.model('user', userSchema);

// Export the User model
module.exports = user;