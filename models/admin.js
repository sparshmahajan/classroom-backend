const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    id: {
        type: Number,
        required: true,
        unique: true
    }
    // using this id because we need a number as id as per the documentation
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;