const express = require("express");
const app = express();
const dotenv = require("dotenv").config(); //Must be used for the .env logic, this line importes the constants from .env to the process object which is used
//on line 11n,
const port = process.env.PORT;

console.log("PORT:", process.env.PORT);
console.log("DB_CONNECT:", process.env.DB_CONNECT);

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoute = require("./routes/posts_route");
app.use("/posts", postsRoute);

const commentsRoute = require("./routes/comments_route");
app.use("/comments", commentsRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});