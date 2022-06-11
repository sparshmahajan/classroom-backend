const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const { Decrypt } = require('../security/bcrypt');
const { getToken } = require('../security/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;
    const item = req.params.item;

    if (item === 'teacher') {
        Teacher.findOne({ email: email }, async function (error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundUser) {
                return res.status(400).send({ message: "User Not Found." });
            }

            const result = await Decrypt(password, foundUser.password);
            if (result === true) {
                const token = getToken({ userId: foundUser._id });
                const { name, email, id } = foundUser;
                res.json({
                    name: name,
                    email: email,
                    id: id,
                    token: token,
                    role: item,
                    message: "Login Successful"
                });
            } else {
                res.status(400).send({ message: "Incorrect Password." })
            }
        });
    }
    else if (item === 'student') {
        Student.findOne({ email: email }, async function (error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundUser) {
                return res.status(400).send({ message: "User Not Found." });
            }

            const result = await Decrypt(password, foundUser.password);
            if (result === true) {
                const token = getToken({ userId: foundUser._id });
                const { name, email, id } = foundUser;
                res.json({
                    name: name,
                    email: email,
                    id: id,
                    token: token,
                    role: item,
                    message: "Login Successful",
                });
            } else {
                res.status(400).send({ message: "Incorrect Password." })
            }
        });
    }
    else if (item === 'admin') {
        Admin.findOne({ email: email }, async function (error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: "Server Error" });
            }

            if (!foundUser) {
                return res.status(400).send({ message: "User Not Found." });
            }

            const result = await Decrypt(password, foundUser.password);
            if (result === true) {
                const token = getToken({ userId: foundUser._id });
                const { name, email, id } = foundUser;
                res.json({
                    name: name,
                    email: email,
                    id: id,
                    token: token,
                    role: item,
                    message: "Login Successful",
                });
            } else {
                res.status(400).send({ message: "Incorrect Password." })
            }
        });
    }
    else {
        return res.status(400).send({ message: "Invalid User Type." });
    }
}

module.exports = { login };