const Student = require('../models/student');

const getScoreCard = async (req, res) => {
    const { userId } = req.user;
    Student.findOne({
        _id: userId
    }, {
        name: 1, email: 1, id: 1, subjects: 1, totalScore: 1, percentage: 1
    }, (err, student) => {
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
        return res.status(200).json(student);
    });
}

module.exports = { getScoreCard };