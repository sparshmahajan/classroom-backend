const Admin = require('../models/admin');

const isAdmin = async (req, res, next) => {
    const userId = req.user.id;
    Admin.findOne({ userId: userId }, function (error, foundUser) {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Server Error" });
        }

        if (!foundUser) {
            return res.status(400).send({ message: "You are not an admin." });
        }
        next();
    });
}

module.exports = { isAdmin };

