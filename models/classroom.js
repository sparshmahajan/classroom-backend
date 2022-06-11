const mongooose = require('mongoose');

const classroomSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    teachers: {
        type: [Number],
    },
    students: {
        type: [Number],
    }
}, { timestamps: true });

const Classroom = mongooose.model('Classroom', classroomSchema);

module.exports = Classroom;