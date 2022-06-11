const mongoose = require('mongoose');
const Subject = require('./subjects');

const studentSchema = new mongoose.Schema({
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
    },
    // using this id because we need a number as id as per the documentation
    classroomId: {
        type: [String],
    },
    subjects: {
        type: [Subject.schema],
        unique: false,
        default: []
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;