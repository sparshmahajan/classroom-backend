const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date_of_exam: {
        type: Date,
        required: true
    },
    date_of_score: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
    },
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;