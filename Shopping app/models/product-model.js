const mongoose = require('mongoose');

// Define the User schema
const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount:{
        type: Number,
        default: 0
    },
    bgcolor: String,
    textcolor: String,
    panelcolor: String,
});

// Create the User model
const product = mongoose.model('product', productSchema);

// Export the User model
module.exports = product;