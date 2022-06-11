const Student = require('../models/student');

const isStudent = async (req, res, next) => {
    const { userId } = req.user;
    Student.findOne({ _id: userId }, (err, student) => {
        if (err) {
            return res.status(500).json({
                message: 'Server error'
            });
        }
        if (!student) {
            return res.status(401).json({
                message: 'You are not authorized to access this resource'
            });
        }
        next();
    });
}

module.exports = { isStudent };