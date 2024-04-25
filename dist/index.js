"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typegoose_1 = require("@typegoose/typegoose");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./utils/middleware/errorHandler");
const fileUpload_1 = require("./utils/Helpers/fileUpload");
const mainRoutes = require("./mainRoutes.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, express_fileupload_1.default)());
(0, fileUpload_1.configS3)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "5000mb" }));
typegoose_1.mongoose.set("strictQuery", true);
typegoose_1.mongoose
    .connect((_a = process.env.DATABASEURL) !== null && _a !== void 0 ? _a : "")
    .then(() => {
    console.log("Connected to database!");
})
    .catch((error) => {
    console.log("Connection failed!", error);
});
app.use("/api", mainRoutes);
app.use(errorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Serving on port" + port);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
