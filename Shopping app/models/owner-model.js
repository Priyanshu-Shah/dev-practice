const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    products:{
        type: Array,
        default: []
    },
    picture: String,
    gstin: String,
});

// Create the User model
const owner = mongoose.model('owner', ownerSchema);

// Export the User model
module.exports = owner;