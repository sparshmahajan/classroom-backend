const Teacher = require('../models/teacher');

const isTeacher = async (req, res, next) => {
    const { userId } = req.user;
    Teacher.findOne({ _id: userId }, (err, teacher) => {
        if (err) {
            return res.status(500).json({
                message: 'Server error'
            });
        }
        if (!teacher) {
            return res.status(401).json({
                message: 'You are not authorized to access this resource'
            });
        }
        req.teacher = teacher;
        next();
    });
}

module.exports = { isTeacher };

