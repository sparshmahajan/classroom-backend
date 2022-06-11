require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

//connect to mongoDB
const db = require("./util/database");

//Routes and controllers
const adminRouter = require("./routes/admin.routes");
const authRouter = require("./routes/auth.routes");

const frontendUrl = "http://localhost:3000";

app.use(cors({ credentials: true, origin: frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', frontendUrl);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});