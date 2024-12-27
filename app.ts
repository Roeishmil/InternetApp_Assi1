import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config(); //Must be used for the .env logic, this line importes the constants from .env to the process object which is used
//on line 11n,
const port = process.env.PORT;

console.log("PORT:", process.env.PORT);
console.log("DB_CONNECT:", process.env.DB_CONNECT);

import mongoose from "mongoose";
const dbtest = process.env.DB_CONNECT;
if(!process.env.DB_CONNECT){
  reject("process.env.DB_CONNECT");
}else{
  mongoose.connect(process.env.DB_CONNECT);
}

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import postsRoute from "./routes/posts_route";
app.use("/posts", postsRoute);

import commentsRoute from "./routes/comments_route";
app.use("/comments", commentsRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function reject(arg0: string) {
  throw new Error("Function not implemented.");
}
