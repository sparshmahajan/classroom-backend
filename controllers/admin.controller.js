const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Classroom = require('../models/classroom');
const randomize = require('randomatic');
const { Encrypt } = require('../security/bcrypt');

const addUser = async (req, res) => {
    const { name, email, password } = req.body; //believing that the data is validated in the frontend
    const item = req.params.item;

    if (item === 'teacher') {
        Teacher.findOne({ email: email }, async function (error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (foundUser) {
                return res.status(400).send({ message: "Account Already exists." });
            }

            const encryptedPassword = await Encrypt(password);
            const teacher = new Teacher({
                name: name,
                email: email,
                password: encryptedPassword,
                id: randomize('0', 5),
            });
            teacher.save(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully saved teacher data." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while saving data." });
                }
            });
        });
    }
    else if (item === 'student') {
        Student.findOne({ email: email }, async function (error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (foundUser) {
                return res.status(400).send({ message: "Account Already exists." });
            }

            const encryptedPassword = await Encrypt(password);
            const student = new Student({
                name: name,
                email: email,
                password: encryptedPassword,
                id: randomize('0', 5),
            });
            student.save(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully saved student data." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while saving data." });
                }
            });
        });
    }
    else if (item === 'class') {
        Classroom.findOne({ name: name }, async function (error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (foundUser) {
                return res.status(400).send({ message: "Classroom Already exists." });
            }

            const classroom = new Classroom({
                name: name,
                id: randomize('0', 5),
            });
            classroom.save(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully saved classroom data." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while saving data." });
                }
            });
        });
    } else {
        return res.status(400).send({ message: "Invalid item." });
    }
};

const adminSignup = async (req, res) => {
    const { name, email, password } = req.body; //believing that the data is validated in the frontend

    Admin.findOne({ email: email }, async function (error, foundUser) {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Server Error" });
        }

        if (foundUser) {
            return res.status(400).send({ message: "Account Already exists." });
        }

        const encryptedPassword = await Encrypt(password);
        const admin = new Admin({
            name: name,
            email: email,
            password: encryptedPassword,
            id: randomize('0', 5),
        });
        admin.save(function (e) {
            if (!e) {
                return res.send({ message: "Successfully saved admin data." });
            }
            else {
                console.log(e);
                return res.status(500).send({ message: "Error while saving data." });
            }
        });
    });
}

const getList = async (req, res) => {
    const item = req.params.item;

    if (item === 'teacher') {
        Teacher.find({}, { name: 1, id: 1, email: 1 }, function (error, foundTeachers) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundTeachers) {
                return res.status(400).send({ message: "No teachers found." });
            }

            res.send(foundTeachers);
        });

    } else if (item === 'student') {
        Student.find({}, { name: 1, id: 1, email: 1 }, function (error, foundStudents) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundStudents) {
                return res.status(400).send({ message: "No students found." });
            }

            res.send(foundStudents);
        });
    } else if (item === 'class') {
        Classroom.find({}, { name: 1, id: 1 }, function (error, foundClassrooms) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundClassrooms) {
                return res.status(400).send({ message: "No classrooms found." });
            }

            res.send(foundClassrooms);
        });
    }
    else {
        return res.status(400).send({ message: "Invalid item." });
    }
};

const mapTeacher = async (req, res) => {
    const { teacherId, classId } = req.params;

    Teacher.findOne({ id: teacherId }, function (error, foundTeacher) {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Server Error" });
        }

        if (!foundTeacher) {
            return res.status(400).send({ message: "Wrong Teacher id" });
        }

        Classroom.findOne({ id: classId }, function (error, foundClassroom) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundClassroom) {
                return res.status(400).send({ message: "Wrong Classroom id" });
            }

            foundTeacher.classroomId.push(foundClassroom.id);
            foundTeacher.save(function (e) {
                if (e) {
                    console.log(e);
                    return res.status(500).send({ message: "Error while mapping teacher to classroom." });
                }
            });
            foundClassroom.teachers.push(foundTeacher.id);
            foundClassroom.save(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully mapped teacher to classroom." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while mapping teacher to classroom." });
                }
            });
        });
    });
}

const mapStudent = async (req, res) => {
    const { classId } = req.params;
    const { studentId } = req.body;

    Classroom.findOne({ id: classId }, function (error, foundClassroom) {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Server Error" });
        }

        if (!foundClassroom) {
            return res.status(400).send({ message: "Wrong Classroom id" });
        }

        studentId.forEach(async (id) => {
            Student.findOne({ id: id }, function (error, foundStudent) {
                if (error) {
                    console.log(error);
                    return res.status(500).send({ message: "Server Error" });
                }

                if (!foundStudent) {
                    return res.status(400).send({ message: "Wrong Student id" });
                }

                foundClassroom.updateOne({ $addToSet: { students: foundStudent.id } }, function (e) {
                    if (e) {
                        console.log(e);
                        return res.status(500).send({ message: "Error while mapping student to classroom." });
                    }
                });

                foundStudent.updateOne({ $addToSet: { classroomId: foundClassroom.id } }, function (e) {
                    if (e) {
                        console.log(e);
                        return res.status(500).send({ message: "Error while mapping student to classroom." });
                    }
                });
            });
        });
        return res.send({ message: "Successfully mapped student to classroom." });
    });
}

const removeUser = async (req, res) => {
    const { id, item } = req.params;

    if (item === 'teacher') {
        Teacher.findOne({ id: id }, function (error, foundTeacher) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundTeacher) {
                return res.status(400).send({ message: "Wrong Teacher id" });
            }

            Classroom.findOneAndUpdate({
                teachers: { $all: [foundTeacher.classroomId] }
            }, {
                $pull: { teachers: id }
            }, function (error, foundClassroom) {
                if (error) {
                    console.log(error);
                    return res.status(500).send({ message: "Server Error" });
                }
            });

            foundTeacher.remove(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully removed teacher." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while removing teacher." });
                }
            });
        });
    } else if (item === 'student') {
        Student.findOne({ id: id }, function (error, foundStudent) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundStudent) {
                return res.status(400).send({ message: "Wrong Student id" });
            }

            Classroom.findOneAndUpdate({
                students: { $all: [foundStudent.classroomId] }
            }, {
                $pull: { students: id }
            }, function (e) {
                if (e) {
                    console.log(e);
                    return res.status(500).send({ message: "Error while removing student from classroom." });
                }
            });

            foundStudent.remove(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully removed student." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while removing student." });
                }
            });
        });
    } else if (item === 'class') {
        Classroom.findOne({ id: id }, function (error, foundClassroom) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundClassroom) {
                return res.status(400).send({ message: "Wrong Classroom id" });
            }

            foundClassroom.students.forEach(async (studentId) => {
                Student.findOneAndUpdate({
                    id: { $all: [studentId] }
                }, {
                    $pull: { classroomId: id }
                }, function (error, foundStudent) {
                    if (error) {
                        console.log(error);
                        return res.status(500).send({ message: "Server Error" });
                    }
                });
            });

            foundClassroom.teachers.forEach(async (teacherId) => {
                Teacher.findOneAndUpdate({
                    id: { $all: [teacherId] }
                }, {
                    $pull: { classroomId: id }
                }, function (error, foundTeacher) {
                    if (error) {
                        console.log(error);
                        return res.status(500).send({ message: "Server Error" });
                    }
                });
            });

            foundClassroom.remove(function (e) {
                if (!e) {
                    return res.send({ message: "Successfully removed classroom." });
                }
                else {
                    console.log(e);
                    return res.status(500).send({ message: "Error while removing classroom." });
                }
            });
        });
    } else {
        return res.status(400).send({ message: "Wrong Query" });
    }
}

const updateUser = async (req, res) => {
    const { id, item } = req.params;
    const { name, email, password } = req.body;

    if (item === 'teacher') {
        Teacher.findOneAndUpdate({ id: id }, {
            $set: {
                name: name,
                email: email,
                password: password
            }
        }, function (error, foundTeacher) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundTeacher) {
                return res.status(400).send({ message: "Wrong Teacher id" });
            }

            return res.send({ message: "Successfully updated teacher." });
        });
    } else if (item === 'student') {
        Student.findOneAndUpdate({ id: id }, {
            $set: {
                name: name,
                email: email,
                password: password
            }
        }, function (error, foundStudent) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundStudent) {
                return res.status(400).send({ message: "Wrong Student id" });
            }

            return res.send({ message: "Successfully updated student." });
        });
    } else if (item === 'class') {
        Classroom.findOneAndUpdate({ id: id }, {
            $set: {
                name: name,
            }
        }, function (error, foundClassroom) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundClassroom) {
                return res.status(400).send({ message: "Wrong Classroom id" });
            }

            return res.send({ message: "Successfully updated classroom." });
        });
    } else {
        return res.status(400).send({ message: "Wrong Query" });
    }
}

module.exports = { addUser, adminSignup, getList, mapTeacher, mapStudent, removeUser, updateUser };