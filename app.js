const express = require("express");
const app = express();
const port = process.env.PORT || 3300;
const bodyParser = require("body-parser");
const cors = require("cors");
const pagesRoute = require("./routes/pages")
const adminRoute = require("./routes/admin")
const con = require("./config/db")
const cookieParser = require("cookie-parser")

// EXPRESS MIDDLEWARES //
app.set("view engine", "ejs")
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

// EXPRESS ROUTES //
app.use("/", pagesRoute)
app.use("/admin",adminRoute)


// EXPRESS SERVER //
app.listen(port, () => {
    console.log("server is running on port: " + port)
})