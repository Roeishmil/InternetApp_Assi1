"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); //Must be used for the .env logic, this line importes the constants from .env to the process object which is used
//on line 11n,
const port = process.env.PORT;
console.log("PORT:", process.env.PORT);
console.log("DB_CONNECT:", process.env.DB_CONNECT);
const mongoose_1 = __importDefault(require("mongoose"));
const dbtest = process.env.DB_CONNECT;
if (!process.env.DB_CONNECT) {
    reject("process.env.DB_CONNECT");
}
else {
    mongoose_1.default.connect(process.env.DB_CONNECT);
}
const db = mongoose_1.default.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const posts_route_1 = __importDefault(require("./routes/posts_route"));
app.use("/posts", posts_route_1.default);
const comments_route_1 = __importDefault(require("./routes/comments_route"));
app.use("/comments", comments_route_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
function reject(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=app.js.map