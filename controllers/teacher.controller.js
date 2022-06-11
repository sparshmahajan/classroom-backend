const Student = require('../models/student');

const getStudentList = async (req, res) => {
    Student.find({}, { name: 1, id: 1, email: 1 }, function (error, foundStudents) {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Server Error" });
        }

        if (!foundStudents) {
            return res.status(400).send({ message: "No students found." });
        }
        return res.status(200).send(foundStudents);
    }).sort({ name: 1 });
}

const addScore = async (req, res) => {
    const id = req.params.id;
    const { classroomId } = req.body;
    const { subject_name, date_of_exam, date_of_score, score, comments } = req.body;
    //Believing data is validated in the frontend

    Student.findOne({ id: id }, function (error, foundStudent) {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Server Error" });
        }

        if (!foundStudent) {
            return res.status(400).send({ message: "No student found." });
        }

        let foundClassroom = false;
        classroomId.forEach(async (classroom) => {
            foundClassroom = foundStudent.classroomId.find(id => classroom === id);
        });

        if (!foundClassroom) {
            return res.status(400).send({ message: "You are not authorized to add scores to this student." });
        }

        const scoreObj = {
            name: subject_name,
            date_of_exam,
            date_of_score,
            score,
            comments
        }

        foundStudent.subjects.push(scoreObj);
        foundStudent.totalScore += score;
        foundStudent.percentage = (foundStudent.totalScore / foundStudent.subjects.length).toFixed(2);

        foundStudent.save((err, updatedStudent) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }

            return res.status(200).json({ message: 'Score added' }, updatedStudent);
        });
    });
}

module.exports = { getStudentList, addScore };